import 'dotenv/config';
import express from 'express';
import asyncHandler from 'express-async-handler';
import * as users from './users_model.mjs';

const app = express();

const PORT = process.env.PORT;

let noParameters = 0;
let yesParameters = 0;
let totalRequests = 0;        

const parameterCounter = (req) => {
    let count = 0;
    if (req.query.name != undefined) {
        count += 1;
    }
    if (req.query.age != undefined) {
        count += 1;
    }
    if (req.query.email != undefined) {
        count += 1;
    }
    if (req.query.phoneNumber != undefined) {
        count += 1;
    }
    if (req.query._id != undefined) {
        count += 1;
    }
    return count;
}

app.use('/retrieve', (req, res, next) => {
    const count = parameterCounter(req);
    if (count > 0) {
        yesParameters++;
    } else {
        noParameters++;
    }
    totalRequests++;

    if(totalRequests == 10 || totalRequests % 10 == 0 && totalRequests > 10) {
        console.log(`Total retrieve requests: ${totalRequests}`);
        console.log(`Retrieve requests with 0 parameters: ${noParameters}`);
        console.log(`Retrieve requests with 1 or more query parameters: ${yesParameters}`);
    }
    next();
});

app.use(express.urlencoded({extended: true}));

app.get('/create', (req, res) => {
    users.createUser(req.query.name, req.query.age, req.query.email, req.query.phoneNumber)
        .then(users => {
            res.json(users);
        })
        .catch(error => {
            console.error(error);
            res.send(`{"Error": "Not found"}`);
        });
});

app.get('/retrieve', (req, res) => {
    let filter = {};
    if (req.query.name != undefined) {
        filter["name"] = req.query.name;
    }
    if (req.query.age != undefined) {
        filter["age"] = req.query.age;
    }
    if (req.query.email != undefined) {
        filter["email"] = req.query.email;
    }
    if (req.query.phoneNumber != undefined) {
        filter["phoneNumber"] = req.query.phoneNumber;
    }
    if (req.query._id != undefined) {
        filter["_id"] = req.query._id;
    }
    users.retrieveUser(filter, '', 0)
        .then(users => {
            res.send(users);
        })
        .catch(error => {
            console.error(error);
            res.send(`{"Error": "Not found"}`);
        })
});


app.get('/update', (req, res) => {
    let condition = {"_id": req.query._id};
    let update = {};
    if (req.query.name != undefined) {
        update["name"] = req.query.name;
    }
    if (req.query.age != undefined) {
        update["age"] = req.query.age;
    }
    if (req.query.email != undefined) {
        update["email"] = req.query.email;
    }
    if (req.query.phoneNumber != undefined) {
        update["phoneNumber"] = req.query.phoneNumber;
    }

    users.updateUser(condition, update, {})
        .then(users => {
            if (users === null) {
                throw Error(`{"Error": "Not found"}`);
            }
            res.send(`{"updateCount": 1 }`);
        })
        .catch(error => {
            console.error(error);
            res.send(`{"Error": "Not found"}`);
        });
});


app.get('/delete', (req, res) => {
    if (req.query._id != undefined) {
        users.deleteUserById(req.query._id)
            .then(result => {
                res.send(`{"deleteCount": ${result.deletedCount}}`);
            })
            .catch(error => {
                console.error(error);
                res.send(`{"Error": "Not found"}`);
            })
    } else {
        let conditions = {}
        if (req.query.name != undefined) {
            conditions["name"] = req.query.name;
        }
        if (req.query.age != undefined) {
            conditions["age"] = req.query.age;
        }
        if (req.query.email != undefined) {
            conditions["email"] = req.query.email;
        }
        if (req.query.phoneNumber != undefined) {
            conditions["phoneNumber"] = req.query.phoneNumber;
        }

        users.deleteUser(conditions)
            .then(result => {
                res.send(`{"deleteCount": ${result.deletedCount}}`);
            })
            .catch(error => {
                console.error(error);
                res.send(`{"Error": "Not found"}`);
            });
    }
});


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});
import mongoose from 'mongoose';
import 'dotenv/config';

mongoose.connect(
    process.env.MONGODB_CONNECT_STRING,
    { useNewUrlParser: true }
);

const db = mongoose.connection;

db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: Number, required: false }
});

const User = mongoose.model("User", userSchema);

/**
 * Create a user
 * @param {String} name
 * @param {Number} age 
 * @param {String} email
 * @param {Number} phoneNumber 
 * @returns  
 */

const createUser = async (name, age, email, phoneNumber) => {
    const user = new User({ name: name, age: age, email: email, phoneNumber: phoneNumber });
    return user.save();
}

const retrieveUser = async (filter) => {
    const query = User.find();
    if (Object.keys(filter).length > 0) {
        query.and(filter);
    }
    return query.exec();
}

 const updateUser = async (conditions, update, options) => {
    return await User.findOneAndUpdate(conditions, update, options);
}

const deleteUserById = async (_id) => {
    return await User.deleteOne({_id: _id});
}

const deleteUser = async (conditions) => {
    return await User.deleteMany(conditions);
}

export { createUser, retrieveUser, updateUser, deleteUserById, deleteUser };
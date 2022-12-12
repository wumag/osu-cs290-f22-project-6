# Assignment 6 — Database Persistence 

Introduction
In this assignment, you will write an Express app that provides GET endpoints to perform CRUD operations against MongoDB. You will program the assignment using Mongoose.

Learning Outcomes
What are database management systems (DBMSs)? (Module 6, MLO 1)
What is MongoDB? (Module 6, MLO 2)
What is Mongoose? (Module 6, MLO 4)
How can we perform CRUD operations using Mongoose? (Module 6, MLO 5)
Instructions
Write a web app that models a user as described below and provides the operations listed below. The user collection must be named users and the database in which the collection is stored must be named users_db.

User
Here are the properties of a User. 

Property	Data Type	Required?
name	String	Yes
age	Number	Yes
email	String	Yes
phoneNumber	Number	No
CRUD Operations
These will be supported via GET requests.
The request data will be provided as query parameters.
The URL’s must be /create, /retrieve, /update and /delete.
Create
A user will be created by sending a GET request for the path /create.

Request Parameters for Create
Here are the query parameters for the request:

Name	Always present?	Notes
name	Yes	
age	Yes	
email	Yes	
phoneNumber	No	phoneNumber will only have the numeric characters 0 through 9, and will not contain any spaces, hyphens or non-numeric characters. Furthermore, it will not start with a 0.
Response Body for Create
The response body will be JSON object for the document created in MongoDB.

Example
Request:

http://localhost:3000/create?name=Cher Gray&age=27&email=cher@example.com&phoneNumber=8114482
Note: URLs containing certain special characters such as spaces need to be encoded. This is called percent-encoding or URL encoding and was discussed in Module 3 Exploration - HTML Forms. Most browsers do the encoding for you, so that you can type a URL with spaces in it and the browser does the necessary encoding when sending the HTTP request. But in case you use a tool for sending HTTP request that does not perform percent-encoding, be aware to this.

Response:

Note that the property "_v" is a version number added by Mongoose. It is OK to include this property in the response. But this is your choice and you can also decide to exclude it from the response.

{  
  "phoneNumber": 8114482,  
  "_id": "60e435e0e2d67f620c534a84",  
  "name": "Cher Gray",  
  "age": 27,  
  "email": "cher@example.com",  
   "__v": 0 
}
Retrieve
Users will be retrieved by sending a GET request for the path /retrieve.

Request Parameters for Retrieve
Here are the query parameters for the request:

Name	Always present?
name	No
age	No
email	No
phoneNumber	No
_id	No
A retrieve request can contain zero or more query parameters.

If the request has no query parameters, then all the documents should be returned.
If the request has one query parameter, then only the documents matching that query parameter should be returned.
If the request has more than one query parameter, then only the documents that match every query parameter should be returned.
In other words, when querying the database, all the values from the query parameters must be AND-ed together.
Response Body for Retrieve
An array of JSON objects corresponding to the documents matching the query parameters. The array will be empty if no document matches the query parameters.

Example
Request:

http://localhost:3000/retrieve?_id=60e435e0e2d67f620c534a84
Response:

[  
  {  
   "phoneNumber": 8114482,
   "_id": "60e435e0e2d67f620c534a84",  
   "name": "Cher Gray",  
   "age": 27,
   "email": "cher@example.com",  
   "__v": 0  
  } 
]
Update
A user will be updated by sending a GET request for the path /update.

Request Parameters for Update
Here are the query parameters for the request:

Name	Always present?
name	No
age	No
email	No
phoneNumber	No
_id	Yes
Every request for /update will always contain _id as a request parameter.
The _id of a document is immutable and cannot be changed.
In addition to _id, a request will contain at least one other query parameter. However, a request may contain more than one query parameter.
For example, a request may contain the query parameters _id, name, phoneNumber.
The required behavior is that if any property is not specified in the query parameters, then the value of that property must not be updated.
For example, if a request contains the query parameters _id, age, phoneNumber, the app must update the document with this specified value of _id
To set the age property of the document to the value in the query parameter and the phoneNumber to the value in the query parameter, regardless of whether or not the document previously had a value for this property.
But must leave the properties name and email of the document unmodified.
Response Body for Update
On success: A JSON object with the count of documents that have been updated. This value will be 1 whenever the update is successful.

{  "modifiedCount": 1 }
On failure: If no document exists with the specified value of _id, the response must contain the following JSON message:

{ "Error" : "Not found"}
Example
Request:

http://localhost:3000/update?_id=60e435e0e2d67f620c534a84&age=28&phoneNumber=12193456
Response:

{  "modifiedCount": 1 }
Delete
A user will be deleted by sending a GET request for the path /delete.

Here are the query parameters for the request:

Name	Always present?
name	No
age	No
email	No
phoneNumber	No
_id	No
A delete request will have exactly one of the above query parameters.

For example:

If the request has the _id query parameter and there is a document with this _id value, it should be deleted.
If the request has the name query parameter, you should delete all the documents in which the value of the name property is exactly the same as the value in the query parameter.
Similarly, if the request has the query parameter email, age or phoneNumber, then all documents matching the value of email, age or phoneNumber must be removed.
Response Body for Delete
An JSON object specifying how many documents were deleted as shown below:

{ "deletedCount": 2}
If no documents were deleted, the response must be:

{ "deletedCount": 0}
Example
Request:

http://localhost:3000/delete?age=27
Response:

{  "deletedCount": 3 }
Separate Model Code from Controller Code
Your model code must be separate from your controller code.
You cannot import the mongoose package in your controller code.
You cannot import the express packages in your model code.
Your model code can be in as many files as you want.
Similarly, your controller code can be in as many files as you want.
However, the model code and the controller code must be in separate files.

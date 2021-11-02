const AWS = require("aws-sdk");
const fs = require('fs');

AWS.config.update({
  region: "us-east-2"
});

// use documentclient() class to create dynamodb service object
// ability to use javascript objects as arguments and return native JS types
const dynamodb = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});

// read seed data
console.log("Importing thoughts into DynamoDB. Please wait.");
const allUsers = JSON.parse(fs.readFileSync("./server/seed/users.json", "utf8"));

// loop over allUsers array and create params object
allUsers.forEach(user => {
  const params = {
    TableName: "Thoughts",
    Item: {
      "username": user.username,
      "createdAt": user.createdAt,
      "thought": user.thought
    }
  };

  // make a call to the database with dynamodb service interface object
  dynamodb.put(params, (err, data) => {
    if (err) {
      console.error("Unable to add thought", user.username, ". Error JSON: ", JSON.stringify(err, null, 2));
    } else {
      console.log("PutItem succeeded: ", user.username)
    }
  })
});
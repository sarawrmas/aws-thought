const AWS = require('aws-sdk');

// DynamoDB uses this to connect to the local instance
AWS.config.update({
  region: "us-east-2",
  endpoint: "http://localhost:8000"
});

// use DynamoDB class to create a service interface object
const dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

// params object holds the schema and metadata of create thoughts table
const params = {
  TableName: "Thoughts",
  // define partition key and sort key
  KeySchema: [
    { AttributeName: "username", KeyType: "HASH" }, // partition key
    // using createdAt as sort key allows queries to automatically sort by this value
    { AttributeName: "createdAt", KeyType: "RANGE" } // sort key
  ],
  // defines the attributes used for hash and range keys
  AttributeDefinitions: [
    { AttributeName: "username", AttributeType: "S" }, // string
    { AttributeName: "createdAt", AttributeType: "N" } // number
  ],
  // reserves a maximum read and write capacity for database which determines pricing
  ProvisionedThroughput: {
    ReadCapacityUnits: 10,
    WriteCapacityUnits: 10
  }
};

// make a call to DynamoDB instance and create the table
dynamodb.createTable(params, (err, data) => {
  if (err) {
    console.error("Unable to create table. Error JSON: ", JSON.stringify(err, null, 2));
  } else {
    console.log("Created table. Table description JSON: ", JSON.stringify(data, null, 2));
  }
});
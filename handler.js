const aws = require("aws-sdk");

let dynamoDBClientParams={}


const dynamodb = new aws.DynamoDB.DocumentClient(
    {
        region: 'localhost',
        endpoint: 'http://localhost:8000',
        accessKeyId: '',  // needed if you don't have aws credentials at all in env
        secretAccessKey: '' // needed if you don't have aws credentials at all in env
    }  
);

const getUsers = async (event, context) => {

    const params = {
        ExpressionAttributeValues: {':pk':'1'},
        KeyConditionExpression: "pk = :pk",
        TableName: "usersTable",
    };

    return dynamodb.query(params).promise().then(res=>{
        console.log(res);
        return {
            "statusCode": 200,
            "body": JSON.stringify({ 'user':  res })
        }
    });
}

module.exports = {
    getUsers
}

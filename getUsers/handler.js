const aws = require("aws-sdk");

let dynamoDBClientParams={}


//si el serverless se ejecuta local, utilizara esta variables de entorno
if(process.env.IS_OFFLINE){
    dynamoDBClientParams= {
        region: 'localhost',
        endpoint: 'http://localhost:8000',
        accessKeyId: '',  // needed if you don't have aws credentials at all in env
        secretAccessKey: '' // needed if you don't have aws credentials at all in env
    }  
}


const dynamodb = new aws.DynamoDB.DocumentClient(dynamoDBClientParams);

const getUsers = async (event, context) => {

    let userId = event.pathParameters.id;

    const params = {
        ExpressionAttributeValues: {':pk':userId},
        KeyConditionExpression: "pk = :pk",
        TableName: "usersTable",
    };

    return dynamodb.query(params).promise().then(res=>{
        console.log(res);
        var responseString= JSON.stringify(res.Items[0]);
        return {
            "statusCode": 200,
            "body": responseString
        }
    });
}

module.exports = {
    getUsers
}

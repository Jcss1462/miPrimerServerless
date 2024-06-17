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

const updateUsers = async (event, context) => {

    let userId = event.pathParameters.id;

    let body = JSON.parse(event.body);

    const params = {
        TableName: "usersTable",
        Key:{pk: userId},
        UpdateExpression: 'set #name = :name, #phone = :phone',
        ExpressionAttributeNames: {'#name': 'name','#phone':'phone'},
        ExpressionAttributeValues: {':name': body.name,':phone':body.phone},
        ReturnValues: "ALL_NEW",
        
    };

    console.log(params.Item);

    return dynamodb.update(params).promise().then(res=>{
        
        return {
            "statusCode": 200,
            "body": JSON.stringify({'user': res.Attributes})
        }
    });
}

module.exports = {
    updateUsers
}

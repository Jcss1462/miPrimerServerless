const aws = require("aws-sdk");

//obtengo un id random para el post
const {randomUUID} = require("crypto");

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

const createUsers = async (event, context) => {

    const id = randomUUID();

    let userBody = JSON.parse(event.body);

    userBody.pk=id;

    const params = {
        TableName: "usersTable",
        Item: userBody
    };

    console.log(params.Item);

    return dynamodb.put(params).promise().then(res=>{
        
        return {
            "statusCode": 200,
            "body": JSON.stringify({'user': params.Item})
        }
    });
}

module.exports = {
    createUsers
}


const hello = async (event, context) => {
    const segundos = new Date().getSeconds();
    return {
        "statusCode": 200,
        "body": JSON.stringify({ 'message': "actualizada"+segundos.toString()})
    }
}

module.exports = {
    hello
}
 
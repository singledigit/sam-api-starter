const dynamodb = require('aws-sdk/clients/dynamodb');
const docClient = new dynamodb.DocumentClient();

const tableName = process.env.SAMPLE_TABLE;

exports.putItemHandler = async (event) => {
    if (event.httpMethod !== 'POST') {
        throw new Error(`postMethod only accepts POST method, you tried: ${event.httpMethod} method.`);
    }
    console.info('received:', event);

    const body = JSON.parse(event.body)
    const id = body.id;
    const name = body.name;

    var params = {
        TableName : tableName,
        Item: { id : id, name: name }
    };

    const result = await docClient.put(params).promise();

    const response = {
        statusCode: 200,
        body: JSON.stringify(body)
    };

    console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);
    return response;
}

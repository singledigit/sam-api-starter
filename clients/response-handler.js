const isLocal = process.env.AWS_SAM_LOCAL;

const handlerModel = (body, headers, code) => {
    let response = {
        'statusCode': code,
        'body': JSON.stringify(body)
    }

    if(headers.length > 0) {
        response.headers = response.headers || {};
        headers.map(header => {
            key = Object.keys(header)[0];
            response.headers[key] = header[key];
        })
    }

    if (isLocal) {
        response.headers = response.headers || {};
        response.headers['Access-Control-Allow-Origin'] = "*"
    }
    
    return new Promise((res, rej) => {
        if(code === 500) rej(response)
        else res(response);
    })
}

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} body - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html 
 * @param {Array} headers - Headers to returned in response
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 * 
 */


exports.success = (body, headers = []) => {
    return handlerModel(body, headers, 200)
}

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} body - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html 
 * @param {Array} headers - Headers to returned in response
 * 
 * @param {Array} code - Status code override (defaults to 500)
 * 
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 * 
 */

exports.fail = (body, headers = [], code = 500) => {
    return handlerModel(body, headers, code)
}
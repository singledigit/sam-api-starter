const lambda = require('../../../src/get-by-id.js'); 
const dynamodb = require('aws-sdk/clients/dynamodb');
const event = require('../../../events/event-get-by-id');
 
describe('Test getByIdHandler', () => { 
    let getSpy; 
 
    beforeAll(() => { 
        getSpy = jest.spyOn(dynamodb.DocumentClient.prototype, 'get'); 
    }); 
 
    afterAll(() => { 
        getSpy.mockRestore(); 
    }); 
 
    it('should get item by id', async () => { 
        const item = { id: 'id1' }; 
 
        getSpy.mockReturnValue({ 
            promise: () => Promise.resolve({ Item: item }) 
        });
 
        const result = await lambda.getByIdHandler(event); 
 
        const expectedResult = { 
            statusCode: 200, 
            body: JSON.stringify(item) 
        }; 
 
        expect(result).toEqual(expectedResult); 
    }); 
}); 
 
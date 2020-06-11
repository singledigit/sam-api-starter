const lambda = require('../../put-item.js'); 
const dynamodb = require('aws-sdk/clients/dynamodb');
const event = require('../../events/event-post-item');
 
describe('Test putItemHandler', function () { 
    let putSpy; 
 
    beforeAll(() => { 
        putSpy = jest.spyOn(dynamodb.DocumentClient.prototype, 'put'); 
    }); 
 
    afterAll(() => { 
        putSpy.mockRestore(); 
    }); 
 
    it('should add id to the table', async () => { 
        const returnedItem = { id: 'id1', name: 'name1' }; 
 
        putSpy.mockReturnValue({ 
            promise: () => Promise.resolve(returnedItem) 
        }); 
     
        const result = await lambda.putItemHandler(event); 
        const expectedResult = { 
            statusCode: 200, 
            body: JSON.stringify(returnedItem) 
        }; 
 
        expect(result).toEqual(expectedResult); 
    }); 
}); 
 
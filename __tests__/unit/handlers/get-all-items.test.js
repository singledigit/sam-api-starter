const lambda = require('../../../src/get-all-items.js'); 
const dynamodb = require('aws-sdk/clients/dynamodb');
const event = require('../../../events/event-get-all-items');
 
describe('Test getAllItemsHandler', () => { 
    let scanSpy; 
 
    beforeAll(() => { 
        scanSpy = jest.spyOn(dynamodb.DocumentClient.prototype, 'scan'); 
    }); 
 
    afterAll(() => { 
        scanSpy.mockRestore(); 
    }); 
 
    it('should return ids', async () => { 
        const items = [{ id: 'id1' }, { id: 'id2' }]; 
 
        scanSpy.mockReturnValue({ 
            promise: () => Promise.resolve({ Items: items }) 
        }); 
  
        const result = await lambda.getAllItemsHandler(event); 
 
        const expectedResult = { 
            statusCode: 200, 
            body: JSON.stringify(items) 
        }; 
 
        expect(result).toEqual(expectedResult); 
    }); 
}); 

import request from 'supertest'
import app from '../../app';

describe('Test GET /drones', ()=>{

        test('It should respond with 200 success', async()=>{
            const response = await request(app).get('/drones');

            
            expect(response.statusCode).toBe(200);
        });
});
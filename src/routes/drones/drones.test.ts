process.env.NODE_ENV = 'test';

import request from 'supertest'
import app from '../../app';
import { dropTestTables, makeTestTables } from '../../database/initidb';

describe('Test GET /drones', ()=>{

    beforeAll(async () => {
        await makeTestTables();
        jest.setTimeout(10000)
    });

    afterAll(async () => {
        dropTestTables();
    });

    describe('Test GET /drones', ()=>{
        test('It should respond with 200 success', async()=>{
            const response = await request(app).get('/drones');

            
            expect(response.statusCode).toBe(200);
        });
    });
        
    describe('Test POST /drones', ()=>{
         
    
            test('It should respond with 200 success', async()=>{
                const response = await request(app).post('/drones')
                .send({
                    "model": "Lightweight",
                    "serial_number": "45609834",
                    "weight_limit": 100,
                    "battery_capacity": 100,
                    "state":"IDLE"
                
                });
    
                
                expect(response.statusCode).toBe(200);
            });
    
    
            test('It should respond with 403 error when serial number already registered', async()=>{
                const response = await request(app).post('/drones')
                .send({
                    "model": "Lightweight",
                    "serial_number": "45609834",
                    "weight_limit": 100,
                    "battery_capacity": 100,
                    "state":"IDLE"
                
                });
    
                
                expect(response.statusCode).toBe(403);
            });
            test('It should respond with 400 error when invalid state', async()=>{
                const response = await request(app).post('/drones')
                .send({
                    "model": "Lightweight",
                    "serial_number": "45609834",
                    "weight_limit": 100,
                    "battery_capacity": 100,
                    "state":"IDLE DIFFERENT"
                
                });
    
                
                expect(response.statusCode).toBe(400);
            });
    
            test('It should respond with 400 error when invalid model', async()=>{
                const response = await request(app).post('/drones')
                .send({
                    "model": "LightweightUnknown",
                    "serial_number": "45609834",
                    "weight_limit": 100,
                    "battery_capacity": 100,
                    "state":"IDLE"
                
                });
    
                
                expect(response.statusCode).toBe(400);
            });
    
    });

    describe('Test POST /drones/load', ()=>{
         
    
        test('It should respond with 200 success', async()=>{
            const response = await request(app).post('/drones/load')
            .send({
                "drone_serial_number": "45609834",
                "name": "Paracetamol",
                "weight": 10,
                "code": "435",
                "image": "image"
            });

            
            expect(response.statusCode).toBe(200);
        });


        test('It should respond with 400 error when serial number does not exist', async()=>{
            const response = await request(app).post('/drones/load')
            .send({
                "model": "Lightweight",
                "serial_number": "456098343445344",
                "weight_limit": 100,
                "battery_capacity": 100,
                "state":"IDLE"
            
            });
            expect(response.statusCode).toBe(400);
        });
    });
    describe('Test GET /drones/available', ()=>{
        
            test('It should respond with 200 success', async()=>{
                const response = await request(app).get('/drones/available');

                
                expect(response.statusCode).toBe(200);
            });
         
    });

    describe('Test GET /drones/:serial_number/medications', ()=>{
        
        test('It should respond with 200 success', async()=>{
            const response = await request(app).get('/drones/45609834/medications');

            
            expect(response.statusCode).toBe(200);
        });
     
    });

    describe('Test GET /drones/:serial_number/battery_level', ()=>{
        
        test('It should respond with 200 success', async()=>{
            const response = await request(app).get('/drones/45609834/battery_level');

            
            expect(response.statusCode).toBe(200);
        });
     
    });
    describe('Test GET /drones/audit', ()=>{
        
        test('It should respond with 200 success', async()=>{
            const response = await request(app).get('/drones/audit');

            
            expect(response.statusCode).toBe(200);
        });
     
    });
    
});


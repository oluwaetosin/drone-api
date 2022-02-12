import { error } from "console";
import { JSONSchema4Type, JSONSchema4TypeName } from "json-schema";
import db from "../database/connection";
import { Medication } from "./medications.model";
import { getIdByName as getStateId } from "./states.model";

class Drone {
    public id: number;
    public serial_number: string;
    public model_id: number;
    public model: string;
    public weight_limit: number;
    public battery_capacity:number;
    public state_id: number;
    public state: string;
    constructor(data: any){
        if(data){
            if(data.id !== undefined){
                this.id = data.id;
            }

            if(data.serial_number !== undefined){
                this.serial_number = data.serial_number;
            }

            if(data.model_id !== undefined){
                this.model_id = data.model_id;
            }

            if(data.weight_limit !== undefined){
                this.weight_limit = data.weight_limit;
            }
            if(data.weight !== undefined){
                this.weight_limit = data.weight;
            }

            if(data.battery_capacity !== undefined){
                this.battery_capacity = data.battery_capacity;
            }
            if(data.model !== undefined){
                this.model = data.model;
            }
            if(data.state !== undefined){
                this.state = data.state;
            }

            if(data.state_id !== undefined){
                this.state_id = data.state_id;
            }
        }
    }
}

const DroneSchema = {
    type: 'object',
    properties: {
        
        drone_serial_number: {
            type: 'string',
            required: true,
            maxLength: 100
        },
        model: {
            type: 'string',
            required: true,
            enum: ['Lightweight', 'Middleweight', 'Cruiserweight', 'Heavyweight']
            
        },
        weight_limit: {
            type: 'number',
            required: true,
            maximum: 500
        },
        battery_capacity: {
            type: 'number',
            required: true,
            maximum: 100
        },
        state: {
            type: 'string',
            required: true,
            enum: ['IDLE', 'LOADING', 'LOADED', 'DELIVERING', 'DELIVERED', 'RETURNING']
        }
        }
       
    }



function getAll(): Promise< Drone[]> {
    return new Promise((resolve, reject)=>{

        db.all('SELECT * FROM drones', function(err, rows: Drone[]){
            if(err){
                reject(err);
            }else {
                
                resolve(rows);
            }
        });

    })
}

function droneExist(serialNumber: string): Promise<Drone>{
    return new Promise((resolve, reject)=>{
        db.get("SELECT * FROM drones where serial_number = $serial_number",{
            $serial_number: serialNumber
        }, (err, row)=>{
            if(err){
                reject(err);
            }else if(row && row.id !== undefined){
                resolve(row);
            }else{
                resolve(null);
            }
        })
    });
  
}

function droneLimitCheck(drone: Drone): Promise<{totalLoad: number}>{
    return new Promise((resolve, reject)=>{
        db.get(`SELECT  SUM(medications.weight) as totalLoad FROM drone_medications inner join medications on 
        medications.id  = drone_medications.medication_id 
         where drone_medications.drone_id = $droneID & drone_medications.active = 1`,{
            $droneID: drone.id
        }, (err, row: {totalLoad: number})=>{
            if(err){
                reject(err);
            }else if(row){
                resolve(row);
            }else{
                resolve(null);
            }
        })
    });
  
}

function createDrone(drone: Drone): Promise<number> {
    return new Promise((resolve, reject)=>{

        db.run(
            `INSERT INTO drones
            (serial_number, 
            model_id, 
            weight_limit, 
            battery_capacity, 
            state_id) VALUES(
                ${drone.serial_number},
                ${drone.model_id},
                ${drone.weight_limit},
                ${drone.battery_capacity},
                ${drone.state_id}
            )`, 
            function(err){
            if(err){
                reject(err);
            }else {
             
                resolve(this.lastID);
            }
        });
        
    })
}

function getAvailableDrones(): Promise<Drone[]> {

    return new Promise((resolve, reject)=>{
        db.all(`SELECT drones.id as id,  states.name as state, serial_number, models.name as model, weight_limit,
        battery_capacity
        FROM drones inner join states
        on states.id = drones.state_id
        inner join models on models.id = drones.model_id
        where states.name in ('IDLE','LOADING')`, 
        function(err, rows: Drone[]){
            if(err){
                reject(err)
            }else{
                resolve(rows);
            }
        });
    })
   
}

async function setDroneState(state: string, drone_id: number) {

        const stateId = await getStateId(state);

        db.run("UPDATE drones SET state_id = $stateId where id = $droneId",{
            $stateId: stateId,
            $droneId: drone_id
        }, function(err){

            console.log(err);
        });
}

function getDroneMedications(serialNumber: string): Promise<Medication[]>{

    return new Promise((resolve, reject)=>{

        db.all(`SELECT medications.name, weight, code, image, identifier from drone_medications
        inner join medications on medications.id = drone_medications.medication_id
        inner join drones on drones.id = drone_medications.drone_id 
        where drones.serial_number = $serialNumber`,{
            $serialNumber: serialNumber
        }, function(err, rows){
            if(err){
                reject(err);
            }else{
                if(!rows){
                    resolve([]);
                } else{
                    resolve(rows);
                }
            }
        })
    })
}


export {
    getAll,
    createDrone,
    getAvailableDrones,
    droneExist,
    droneLimitCheck,
    setDroneState,
    getDroneMedications,
    Drone,
    DroneSchema
}


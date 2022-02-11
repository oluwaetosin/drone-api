import { error } from "console";
import db from "../database/connection";

class Drone {
    public id: number;
    public serial_number: string;
    public model_id: number;
    public weight_limit: number;
    public battery_capacity:number;
    public state_id: number;
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

            if(data.battery_capacity !== undefined){
                this.battery_capacity = data.battery_capacity;
            }

            if(data.state_id !== undefined){
                this.state_id = data.state_id;
            }
        }
    }
}


function getAll(): Promise<string | Drone[]> {
    return new Promise((resolve, reject)=>{

        db.all('SELECT * FROM drones', function(err, rows: Drone[]){
            if(err){
               return reject(err.message);
            }else {
                
               return resolve(rows);
            }
        });

    })
}

function createDrone(drone: Drone): Promise<string | number> {
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
               return reject(err.message);
            }else {
                
               return resolve(this.lastID);
            }
        });
        
    })
}

function getAvailableDrones() {
    
    db.get("SELECT * FROM drones WHERE state_id");
}

export {
    getAll,
    createDrone,
    getAvailableDrones,
    Drone
}


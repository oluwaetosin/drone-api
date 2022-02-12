import { error } from "console";
import db from "../database/connection";
import { Drone } from "./drones.model";
import { Medication } from "./medications.model";
import { Trip } from "./trips.model";

class DroneMedication {
    public id: number;
    public drone_id: number;
    public medication_id: number;
    public active: number;
     
    constructor(drone?: Drone, medication?: Medication){
        if(drone && medication){
             this.drone_id =  drone.id;
             this.medication_id = medication.id;
             this.active = 1;
        }
    }
}


const DroneMedicationSchema = {
    type: 'object',
    properties: {
        drone_serial_number: {
            type: 'string',

        },
        name: {
            type: 'string',
            required: true,
            pattern: '[a-bA-Z0-9 -_]'
        },
        weight: {
            type: 'number',
            required: true
        },
        code: {
            type: 'string',
            required: true,
            pattern: '[A-Z0-9_]'
        },
        image: {
            type: 'string',
            required: true
        }
        }
       
    }





function createDroneMedication(dronemed: DroneMedication): Promise<string | number> {
    return new Promise((resolve, reject)=>{

        db.run(
            `INSERT INTO drone_medications
            (drone_id, 
            medication_id,
            active
           ) VALUES(
                ${dronemed.drone_id},
                ${dronemed.medication_id},
                1
            )`, 
            function(err){
            if(err){
               return reject(err);
            }else {
                
               return resolve(this.lastID);
            }
        });
        
    })
}



export {
    createDroneMedication,
    DroneMedication,
    DroneMedicationSchema
}


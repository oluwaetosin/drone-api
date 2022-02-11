import { error } from "console";
import db from "../database/connection";
import { Drone } from "./drones.model";
import { Medication } from "./medications.model";
import { Trip } from "./trips.model";

class TripMedication {
    public id: number;
    public trip_id: number;
    public medication_id: number;
     
    constructor(trip?: Trip, medication?: Medication){
        if(trip && medication){
             this.trip_id =  trip.id;
             this.medication_id = medication.id
        }
    }
}




function createTripMedication(trip: TripMedication): Promise<string | number> {
    return new Promise((resolve, reject)=>{

        db.run(
            `INSERT INTO trip_medications
            (trip_id, 
            medication_id
           ) VALUES(
                ${trip.trip_id},
                ${trip.medication_id}
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

function createTripMedications(trip: Trip, medications: Medication[]): Promise<string | number> {
    return new Promise((resolve, reject)=>{
        const tripMeds = medications.map((medication)=>{
            return `(${trip.id}, ${medication.id})`
        });
        const tripMedsAsString = `VALUES ${tripMeds.join(',')}`;
        db.run(
            `INSERT INTO trip_medications
            (trip_id, 
            medication_id
           ) ${tripMedsAsString}`, 
            function(err){
            if(err){
               return reject(err.message);
            }else {
                
               return resolve(1);
            }
        });
        
    })
}

 

export {
    createTripMedications,
    createTripMedication,
    TripMedication
}


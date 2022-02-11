import { error } from "console";
import db from "../database/connection";
import { Drone } from "./drones.model";

class Trip {
    public id: number;
    public drone_id: number;
    public start_date: number;
    public end_date?: number;
    public active: number;
    constructor(drone?: Drone){
        if(drone){
             this.drone_id =  drone.id;
             this.start_date = Date.now(),
             this.active = 1
        }
    }
}




function createTrip(trip: Trip): Promise<string | number> {
    return new Promise((resolve, reject)=>{

        db.run(
            `INSERT INTO trips
            (drone_id, 
            start_date, 
            active
           ) VALUES(
                ${trip.drone_id},
                ${trip.start_date},
                ${trip.active}
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

 

export {
    createTrip,
     Trip
}


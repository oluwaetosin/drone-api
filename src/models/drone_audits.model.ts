import db from "../database/connection";
import { Drone } from "./drones.model";

class DroneAudit {
    public id: number;
    public drone_id: number;
    public battery_level: number;
    public date?: number;
    constructor(drone?: Drone){
        if(drone){
             this.drone_id =  drone.id;
             this.battery_level = drone.battery_capacity,
             this.date = Date.now();
        }
    }

    save(){
        db.run(`INSERT INTO drone_audits(drone_id, battery_level, date) 
        VALUES(${this.drone_id},${this.battery_level}, ${Date.now()})`, 
        function(err){
            if(err){
                console.log(`Error creating audit ${err.message}`);
            }
        })
    }

    static batchInsert(drones: Drone[]) {
        const transformedDrones = drones.map((currDrone)=>{
            return `(${currDrone.id},${currDrone.battery_capacity}, ${Date.now()})`
        });
        const auditString = `VALUES ${transformedDrones.join(',')}`;

        db.run(`INSERT INTO drone_audits(drone_id, battery_level, date) 
        ${auditString}`, 
        function(err){
            if(err){
                console.log(`Error creating audit ${err.message}`);
            }
        })

    }
}

function getAudits(){
    return new Promise((resolve, reject)=>{
        db.all(`SELECT serial_number, date, battery_level from drone_audits 
        inner join drones on drones.id = drone_audits.drone_id`, function(err, rows){
            if(err){
                reject(err.message);
            }
            else if(rows){
                resolve(rows);
            }else{
                resolve([]);
            }
        });
    });
    
}



export default  DroneAudit;
export {getAudits};


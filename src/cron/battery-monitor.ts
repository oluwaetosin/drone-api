import * as cron from 'node-cron'

import { Drone, droneExist, getAll as getAllDrones, createDrone as addDrone, droneLimitCheck, getAvailableDrones, setDroneState, getDroneMedications } from "../models/drones.model"
import DroneAudit from '../models/drone_audits.model';


 function starBatteryMonitoring(){
    cron.schedule('* * * * *', async() => {
        console.log('running a task every minute at the 5th second');
        try {
            const allDrones = await getAllDrones();
            await DroneAudit.batchInsert(allDrones);  
        } catch (error) {
            console.log(error);
        }
       

      });
}

export default starBatteryMonitoring;
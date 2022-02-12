import { Request, Response } from 'express';

import { Drone, droneExist, getAll as getAllDrones, createDrone as addDrone, droneLimitCheck } from "../../models/drones.model"
import { createDroneMedication, DroneMedication } from '../../models/drone_medications.model';
import { createMedication, Medication, medicationExist } from '../../models/medications.model';
import { getIdByName } from "../../models/models.model";
import { getIdByName as getStateIdByName } from "../../models/states.model";



async function  getDrones(req: Request, res: Response){
    try{
        const drones =  await getAllDrones();
        return res.status(200).json(drones);
    }catch(ex){
        return res.status(500).json(ex.message);
    }
   
}

async function  createDrones(req: Request, res: Response){
    try{

        const drone = new Drone(req.body);
        const {model, state} = req.body;

        const model_id = await getIdByName(model);
        const state_id = await getStateIdByName(state);

        if(model_id && state_id){
            
            drone.model_id = model_id;
            drone.state_id = state_id;

        } else{
            return res.status(500).json("Bad Request");
        }

        const droneAlreadyExist = await droneExist(drone.serial_number);

        if(droneAlreadyExist){

            return res.status(403).json("Drone with serial number already exist");
        }

        await addDrone(drone);

        return res.status(200).json("Drone Added successfully");

    }catch(ex){

        return res.status(500).json(ex.message);
    }
   
}

async function loadDrones(req: Request, res: Response){
    try {
        const {drone_serial_number} = req.body;

        const droneIsVaild = await droneExist(drone_serial_number);
    
        if(!droneIsVaild){
            return res.status(403).json("Drone with serial number not found");
        }

        const droneWeight = await droneLimitCheck(droneIsVaild);

       
    
        const medication = new Medication(req.body);
        if( (droneWeight.totalLoad + medication.weight) > droneIsVaild.weight_limit){

            return res.status(403).json("Drone will exceed capacity");
        }
        let medicationIsFound = await medicationExist(medication);
    
        if(!medicationIsFound){
    
            medicationIsFound = await  createMedication(medication);
        }
    
        if(!medicationIsFound){
    
            return res.status(500).json("Medication could not been added");
        }
        const droneMed = new DroneMedication();
        droneMed.drone_id = droneIsVaild.id;
        droneMed.medication_id = medicationIsFound;
    
        await createDroneMedication(droneMed);
        return res.status(200).json("Drone Loaded");
     
    } catch (error) {
        return res.status(500).json(error.message);
    }
    
}

export{
    getDrones,
    createDrones,
    loadDrones
}
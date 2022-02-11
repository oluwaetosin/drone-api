import { Request, Response } from 'express';

import { Drone, droneExist, getAll as getAllDrones, createDrone as addDrone } from "../../models/drones.model"
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

export{
    getDrones,
    createDrones
}
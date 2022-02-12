import express, { Router } from 'express';
import expressjsonschema from 'express-jsonschema';
import { DroneSchema, getAvailableDrones } from '../../models/drones.model';
import { DroneMedicationSchema } from '../../models/drone_medications.model';

import { createDrones, getAllAvailableDrones, getAudit, getDroanBatteryLevel, getDrones, getDronMeds, loadDrones } from './drones.controllers';

const vailidate = expressjsonschema.validate

const dronesRouter: Router =  express.Router();

/**
 * @api {get} /drones Get All Drones
 * @apiName Get All Drones
 * 
 * @apiSuccess (200) {Array} Collection of `Drone` Object
 */

dronesRouter.get('/drones', getDrones);

/**
 * @api {get} /drones Register A Drone
 * @apiName Register Drone
 * 
 * @apiParam {String} [model] model
 * @apiParam {String} [serial_number] Drone Serial Number
 * @apiParam {Number} [weight_limit] Drone Weight Limit
 * @apiParam {Number} [battery_capacity] Battery Capacity
 * @apiParam {String} [state] State of Drone
 * 
 * @apiSuccess (200) {String} Drone Added successfully
 */

dronesRouter.post('/drones', vailidate({body: DroneSchema}),  createDrones);

/**
 * @api {get} /drones/load Load  A Droan With Medication Item
 * @apiName Load Droan 
 * 
 * @apiParam {String} [drone_serial_number] Droan Serial Number
 * @apiParam {String} [name] Medication Name
 * @apiParam {Number} [weight] Medication weight
 * @apiParam {String} [code] Medication Code
 * @apiParam {String} [image] Absolute Url of Medication Image
 * 
 * @apiSuccess (200) {String} Drone Loaded
 */

dronesRouter.post('/drones/load', vailidate({body: DroneMedicationSchema}),  loadDrones);

/**
 * @api {get} /drones/available Check Available Drones For Loading
 * @apiName Get Available Drones
 * 
 * 
 * @apiSuccess (200) {Array} Collection of `Drone` Object
 */

dronesRouter.get('/drones/available',  getAllAvailableDrones);

/**
 * @api {get} /drones/:serial_number/medications Check Loaded Medication For a Given Drone
 * @apiName Check Drone Medications
 * 
 * @apiParam {String} [serial_number] Drone Serial Number
 * 
 * @apiSuccess (200) {Array} Collection of `Medications` Object
 */
dronesRouter.get('/drones/:serial_number/medications',  getDronMeds);
/**
 * @api {get} /drones/:serial_number/battery_level Check Drone Battery Level
 * @apiName Check Drone Battery Level
 * 
 * @apiParam {String} [serial_number] Drone Serial Number
 * 
 * @apiSuccess (200) {Number} Drone Battery Level
 */
dronesRouter.get('/drones/:serial_number/battery_level',  getDroanBatteryLevel);

/**
 * @api {get} /drones/:serial_number/battery_level Check Drone Battery Level
 * @apiName Check Drone Battery Level
 * 
 * @apiParam {String} [serial_number] Drone Serial Number
 * 
 * @apiSuccess (200) {Number} Drone Battery Level
 */
 dronesRouter.get('/drones/audit',  getAudit);


export default dronesRouter;
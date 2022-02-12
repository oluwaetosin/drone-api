import express, { Router } from 'express';
import expressjsonschema from 'express-jsonschema';
import { DroneSchema, getAvailableDrones } from '../../models/drones.model';
import { DroneMedicationSchema } from '../../models/drone_medications.model';

import { createDrones, getAllAvailableDrones, getDrones, loadDrones } from './drones.controllers';

const vailidate = expressjsonschema.validate

const dronesRouter: Router =  express.Router();

dronesRouter.get('/drones', getDrones);

dronesRouter.post('/drones', vailidate({body: DroneSchema}),  createDrones);

dronesRouter.post('/drones', vailidate({body: DroneSchema}),  createDrones);

dronesRouter.post('/drones/load', vailidate({body: DroneMedicationSchema}),  loadDrones);

dronesRouter.get('/drones/available',  getAllAvailableDrones);

dronesRouter.get('/drones/:serial_number/medications',  getAllAvailableDrones);


export default dronesRouter;
import express, { Router } from 'express';
import expressjsonschema from 'express-jsonschema';
import { DroneSchema } from '../../models/drones.model';

import { createDrones, getDrones } from './drones.controllers';

const vailidate = expressjsonschema.validate

const dronesRouter: Router =  express.Router();

dronesRouter.get('/drones', getDrones);

dronesRouter.post('/drones', vailidate({body: DroneSchema}),  createDrones);

export default dronesRouter;
import express, { Router } from 'express';

const dronesRouter: Router =  express.Router();

dronesRouter.get('drones', getDrones);

dronesRouter.put('drones', createDrones);

export default dronesRouter;
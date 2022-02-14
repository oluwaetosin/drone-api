
import express, { Application } from 'express'
import morganBody from 'morgan-body'

import dronesRouter from './routes/drones/drones.router';
import RequestValidator from './middlewares/request.validator';



const app: Application = express();

app.use(express.json());
app.use(dronesRouter);
app.use(RequestValidator);
 


export default app;


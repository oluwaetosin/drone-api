import http from 'http';
import express, { Application } from 'express'
import morganBody from 'morgan-body'

import dronesRouter from './routes/drones/drones.router';
import RequestValidatir from './middlewares/request.validator';
import RequestValidator from './middlewares/request.validator';



const app: Application = express();

app.use(express.json());
app.use(dronesRouter);
app.use(RequestValidator);
 
morganBody(app);

export default app;


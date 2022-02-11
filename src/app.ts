import http from 'http';
import express, { Application } from 'express'
import dronesRouter from './routes/drones/drones.router';



const app: Application = express();

app.use(express.json());
app.use(dronesRouter);

export default app;


import bodyParser from 'body-parser';
import express, { Application } from 'express'

import makeTables from './database/initidb';

const app: Application = express();


const port = 3000;

app.use(bodyParser)

app.listen(port, ()=>{

    makeTables();
});



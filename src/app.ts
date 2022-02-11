import http from 'http';
import bodyParser from 'body-parser';
import express, { Application } from 'express'

import makeTables from './database/initidb';

const app: Application = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

export default app;


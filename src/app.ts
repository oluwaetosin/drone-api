import express from 'express'


import makeTables from './database/initidb';

const app = express();


const port = 3000;

app.listen(port, ()=>{

    makeTables();
});



import http from 'http';
import app from './app';

import makeTables from './database/initidb';

const port = process.env.PORT || 3000;

const server: http.Server = http.createServer(app);

server.listen(port, ()=>{
    console.log("Server started on port " + port);

    makeTables();
});
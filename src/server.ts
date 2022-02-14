import http from 'http';
import app from './app';

import makeTables from './database/initidb';
import starBatteryMonitoring from './cron/battery-monitor'

const port = process.env.PORT || 8000;

const server: http.Server = http.createServer(app);

server.listen(port, async ()=>{
    console.log("Server started on port " + port);

    await makeTables();

    /**
     * setup a cron job to create droe audit hourly
     */
    starBatteryMonitoring();

});
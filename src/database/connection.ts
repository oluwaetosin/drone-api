import sqlite3 from 'sqlite3';

const sqlite  =  sqlite3.verbose();

const db = new sqlite.Database('memory_db', (err)=>{
    if(err){
      return  console.log(err);
    }
    console.log("Connected to memeory database");
});


export default db;
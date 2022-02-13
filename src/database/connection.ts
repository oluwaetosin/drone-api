import sqlite3 from 'sqlite3';

const sqlite  =  sqlite3.verbose();

const file = process.env.NODE_ENV === 'test' ? '__testdb__' : 'memory_db';

const db = new sqlite.Database(file, (err)=>{
    if(err){
      return  console.log(err);
    }
    console.log("Connected to memeory database");
});


export default db;
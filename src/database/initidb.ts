import db from './connection';
import tables, { tableNames } from './seed';
import {setup_data} from './seed';


function makeTables(): Promise<boolean> {
    return new Promise((resolve, reject) =>{
        let tracker = tables.length;
  
        tables.forEach(table => {
            db.run(table,  async function(error) {
                if(!error){
                   
                    tracker--;
                } else{
                    console.log(error.message);
                }
    
                if(tracker === 0){
                  await  insertData();
                  resolve(true);
                }
    
            });
        });
    })
    
}

async function insertData(): Promise<boolean>{
  
    return new Promise((resolve, reject)=>{
        let data_length = setup_data.length;

        setup_data.forEach(data => {
            
            db.run(data, function( error){
               data_length--
                if(error){
                    console.log(error.message);
                }
                if(data_length === 0){
                    resolve(true);
                }
                
            })
        });
    });
    
}

export async function makeTestTables(): Promise<boolean>{
    return new Promise((resolve, reject)=>{
        let tracker = tables.length;
  
        tables.forEach(table => {
            db.run(table, async function(error) {
                tracker--;
                
                if(tracker === 0){
                    await insertData();
                    resolve(true);
                }
    
            });
        });
    });
  
}


export function dropTestTables(): Promise<boolean>{
    return new Promise((resolve, reject)=>{
        let tableLength = tableNames.length;
        tableNames.forEach(table => {
      
            db.run(`DROP TABLE IF EXISTS ${table}`, function( error){
               tableLength--;
                if(error){
                    console.log(error.message);
                }
                if(tableLength === 0){
                    resolve(true);
                }
                
            })
        });
    })
  
}



export default makeTables;
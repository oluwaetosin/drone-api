import db from './connection';
import tables from './seed';
import {setup_data} from './seed';


function makeTables(): void{
    let tracker = tables.length;
  
    tables.forEach(table => {
        db.run(table, function(error) {
            if(!error){
               
                tracker--;
            } else{
                console.log(error.message);
            }

            if(tracker === 0){
                insertData();
            }

        });
    });
}

function insertData(): void{
   db.all("SELECT * FROM states", function(err, rows){
       if(err){
           console.error(err);
       }
     
   });
   
    setup_data.forEach(data => {
      
        db.run(data, function( error){
           
            if(error){
                console.log(error.message);
            }
            
        })
    });
}



export default makeTables;
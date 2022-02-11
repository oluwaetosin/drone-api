import db from "../database/connection";

interface IModel{
     name: string;
     id?: number;
}

function getAll(): Promise<string | IModel[]>{
    return new Promise((resolve, reject)=>{

        db.all("SELECT * FROM models", function(err, rows: IModel[]){
            if(err){
                return reject(err.message);
            }else {
                resolve(rows);
            }
        })

    });
    
}


function getIdByName(name: string): Promise<number>{
    return new Promise((resolve, reject)=>{

        db.get("SELECT * FROM models WHERE name = $name", {
            $name: name
        }, function(err, row: IModel){

            if(err){

                reject(err.message);
           }
           else if(row.id === undefined){

               resolve(0);
           }
           else {

               resolve(row.id);
           }
        })

    });
    
}

export {
    getIdByName,
    getAll,
    IModel
}

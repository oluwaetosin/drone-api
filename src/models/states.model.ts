import db from "../database/connection";

 interface IState{
     name: string;
     id?: number;
}

function getAll(): Promise<string | IState[]>{
    return new Promise((resolve, reject)=>{

        db.all("SELECT * FROM states", function(err, rows: IState[]){
            if(err){
                return reject(err.message);
            }else {
                resolve(rows);
            }
        })

    });
    
}


function getIdByName(name: string): Promise<string | number>{
    return new Promise((resolve, reject)=>{

        db.get("SELECT * FROM states WHERE name = $name", {
            $name: name
        }, function(err, row: IState){
            if(err){
                return reject(err.message);
            }else {
                resolve(row.id);
            }
        })

    });
    
}


export {getAll, getIdByName, IState}


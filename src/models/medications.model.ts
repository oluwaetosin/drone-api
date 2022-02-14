import db from "../database/connection";

class Medication {
    public id: number;
    public name: string;
    public weight: number;
    public code:string;
    public identifier: string;
    public image:string;
    constructor(data: any){
        if(data){
            if(data.id !== undefined){
                this.id = data.id;
            }

            if(data.name !== undefined){
                this.name = data.name;
            }

            if(data.weight !== undefined){
                this.weight = data.weight;
            }

            if(data.code !== undefined){
                this.code = data.code;
            }

            if(data.weight && data.code && data.name){
                this.identifier = `${data.name}${data.weight}${data.code}`;
            }

            if(data.image !== undefined){
                this.image = data.image;
            }

            
        }
    }
}


const MedicationSchema = {
    type: 'object',
    properties: {
        
        name: {
            type: 'string',
            required: true,
            pattern: '[a-bA-Z0-9 -_]'
        },
        weight: {
            type: 'number',
            required: true
        },
        code: {
            type: 'string',
            required: true,
            pattern: '[A-Z0-9_]'
        },
        image: {
            type: 'string',
            required: true
        }
        }
       
    }


function getAll(): Promise<string | Medication[]> {
    return new Promise((resolve, reject)=>{

        db.all('SELECT * FROM medications', function(err, rows: Medication[]){
            if(err){
               return reject(err.message);
            }else {
                
               return resolve(rows);
            }
        });

    })
}

function createMedication(medication: Medication): Promise<number> {
    return new Promise((resolve, reject)=>{

        db.run(
            `INSERT INTO medications (name,weight,code,identifier,image) 
            VALUES('${medication.name}',${medication.weight},'${medication.code}','${medication.identifier}','${medication.image}')`, 
            function(err){
            if(err){
               return reject(err);
            }else {
                
               return resolve(this.lastID);
            }
        });
        
    })
}

function medicationExist(medication: Medication): Promise<number> {
    
    return new Promise((resolve, reject)=>{
        db.get("SELECT * FROM medications WHERE identifier = $identifier",{
            $identifier: medication.identifier
        }, function(err, row: Medication){
            
            if(err){

                return reject(err);

            }else{

                if(!row){
                    return resolve(0);
                }
                return resolve(row.id);
            }
        });
    });
}

export {
    getAll,
    medicationExist,
    createMedication,
    Medication,
    MedicationSchema
}


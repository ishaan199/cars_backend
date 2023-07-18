import CarModel from '../models/carModel.js';
import {connectToDB} from '../database/db.js'


//create cars
export async function createCars(req,res){
    try{
        const db = await connectToDB();
        const collection = db.collection("cars");
        const data = req.body;
        const {type, name, model, car_info} = data;
        if(!type){
            return res.status(400).send({status:false,msg:"Type field should be present."})
        };
        if(!name){
            return res.status(400).send({status:false,msg:"Name field should be present."});
        };
        if(!model){
            return res.status(400).send({status:false,msg:"Model field should be present."});
        };
        if(!car_info){
            return res.status(400).send({status:false,msg:"car info should be present"});
        };

        const {wheel, year} = car_info;

        if(!wheel){
            return res.status(400).send({status:false,msg:"Wheel should be present."});
        };
        if(!year){
            return res.status(400).send({status:false,msg:'Year should be present.'});
        };

        const carsData = new CarModel(data);
        await collection.insertOne(carsData);
        res.status(201).send({status:true,msg:"successful",data:carsData});
    }catch(err){
        res.status(500).send({status:false,msg:"server error",error:err.message});
    };
};
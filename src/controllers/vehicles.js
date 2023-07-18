import VehicleModel from '../models/vehiclesModel.js';
import { connectToDB } from '../database/db.js';
export async function sold_vehicles(req,res){
    try{
        const db = await connectToDB();
        const collection = db.collection("sold_vehicles");
        
        const {car_id,vehicles_info} = req.body;

        if(!car_id){
            return res.status(400).send({status:false,msg:"Car id is must"});
        };
        if(!vehicles_info){
            return res.status(400).send({status:false,msg:"Vehicls info is must"});
        };
        let {registerNumber, ownerName, fuelType} = vehicles_info;

        if(!registerNumber){
            return res.status(400).send({status:false,msg:"Register number is must"});
        };
        if(!ownerName){
            return res.status(400).send({status:false,msg:"Owner name is must"});
        };
        if(!fuelType){
            return res.status(400).send({status:false,msg:"Fuel type is must"});
        };
        const newVehicles  = new VehicleModel(req.body);
        await collection.insertOne(newVehicles);
        res.status(201).send({status:true,data:newVehicles});
    }catch(error){
        return res.status(500).send({status:false,msg:"Server",error:error.message})
    }
}
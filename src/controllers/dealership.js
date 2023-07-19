import { ObjectId } from 'mongodb';
import { connectToDB } from '../database/db.js';
import DealershipModel from '../models/dealershipModel.js';


export async function dealership (req,res) {
    try{
        const db = await connectToDB();
        const collection = db.collection("dealership");
        const data = req.body;
        const newDealership = new DealershipModel(data);
        await collection.insertOne(newDealership);
        res.status(201).send({status:true,data:newDealership});
    }catch(err){
        return res.status(500).send({status:false,msg:"Server",error:err.message});
    }
}

export async function viewAllCarsDealership (req,res) {
    try{
        const db = await connectToDB();
        const collection = db.collection("cars");
        const carList = await collection.find().toArray();
        res.status(201).send({status:true,data:carList});
    }catch(error){
        return res.status(500).send({status:false,msg:"Server",error:error.message});
    };
};

export async function viewSoldCarsDealership (req,res) {
    try{
        const db = await connectToDB();
        const collection = db.collection("dealership");
        const carCollection = db.collection("sold_vehicles");
        const dealerId = req.params.dealerId;
        const dealerData = await collection.findOne({_id:ObjectId(dealerId)});
        const carsList = dealerData.sold_vehicles;
        const soldCars = [];
        for(let i of carsList){
            let data = await carCollection.findOne({_id:ObjectId(i)});
            soldCars.push(data);
        }
        res.status(201).send({status:true,data:soldCars});
    }catch(error){
       return res.status(500).send({status:false,msg:"Server",error:error.message});
    };
};

export async function viewDealsByDealership(req,res){
    try{
        const db = await connectToDB();
        const dealsCollection = db.collection("deals");
        const dealerCollection = db.collection('dealership');
        const dealerId = req.params.dealerId;
        const dealerData = await dealerCollection.findOne({_id:ObjectId(dealerId)});
        const dealer = dealerData.deals;
        const deals = [];
        for(let i of dealer){
            console.log(i)
            let dealsData = await dealsCollection.findOne({_id:ObjectId(i)});
            deals.push(dealsData);
        };
        res.status(201).send({status:true,data:deals});
    }catch(error){
        return res.status(500).send({status:false,msg:"Server",error:error.message});
    };
};

export async function addCarsToDealership(req,res){
    try{
        const db = await connectToDB();
        const dealerCollection = db.collection("dealership");
        const carsCollection = db.collection('cars');
        const dealerId = req.params.dealerId;
        const carId = req.params.carId;
        const carData = await carsCollection.findOne({_id:ObjectId(carId)})
        if(!carData){
            return res.status(400).send({status:false,msg:"Car is not available"});
        };
        const dealerDeals = await dealerCollection.findOne({_id:ObjectId(dealerId)});
        const carsData = dealerDeals.cars;
        const result = await dealerCollection.findOneAndUpdate({_id:ObjectId(dealerId)},{$set:{cars:[...carsData,carId]}},{new:true})
        res.status(201).send({status:true,data:result});
    }catch(error){
        return res.status(500).send({status:false,msg:"Server",error:error.message});
    }
}
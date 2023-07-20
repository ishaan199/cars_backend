import { ObjectId } from 'mongodb';
import { connectToDB } from '../database/db.js';
import DealershipModel from '../models/dealershipModel.js';
import bcrypt, { genSalt } from 'bcrypt';
import {checkEmail, checkName} from '../middlewares/validations/validators.js'
import jwt from 'jsonwebtoken';

export async function dealership (req,res) {
    try{
        const db = await connectToDB();
        const collection = db.collection("dealership");
        const data = req.body;
        let {dealership_email,dealership_name,dealership_location,dealer_password,dealership_info,deals,sold_vehicles,cars} = data;
        
        if(!dealership_email || !checkEmail(dealership_email)) {
            return res.status(400).send({status:false,msg:"Enter the valid email "})
        }
        const checkEmailInDb = await collection.findOne({dealership_email:dealership_email});
        
        if(checkEmailInDb){
            return res.status(400).send({status:false,msg:"This email is already registered"});
        };

        if(!dealership_name || !checkName(dealership_name)){
            return res.status(400).send({status:false,msg:"Enter a valid name"});
        };

        if(!dealer_password){
            return res.status(400).send({satatus:false,msg:"password must be present"})
        };
        
        dealer_password = await bcrypt.hash(dealer_password,10);
        // console.log(encryptPass)
        
        if(!dealership_location){
            return res.status(400).send({status:false,msg:"Enter location"})
        };
        
        if(!dealership_info.name || !dealership_info.phone){
            return res.status(400).send({status:false,msg:"Do not leave dealership info field"})
        };

        let dealer = {
          dealership_email: dealership_email,
          dealership_name: dealership_name,
          dealership_location: dealership_location,
          dealership_info: dealership_info,
          dealer_password: dealer_password.toString(),
          deals: deals,
          sold_vehicles: sold_vehicles,
          cars: cars,
        };
        console.log(dealer)
        const newDealership = new DealershipModel(dealer);
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
    };
};

export async function addDealsToDealership (req,res){
    try{
        const db = await connectToDB();
        const dealsCollection = db.collection("deals");
        const dealerCollection = db.collection('dealership');
        const dealsId = req.params.dealsId;
        const dealerId = req.params.dealerId;

        const deals = await dealsCollection.findOne({_id:ObjectId(dealsId)});
        if(!deals){
            return res.status(400).send({status:false,msg:"This deal is not present"});
        };
        const dealerDeals = await dealerCollection.findOne({_id:ObjectId(dealerId)});
        const dealsData = dealerDeals.deals
        const result = await dealerCollection.findOneAndUpdate({_id:ObjectId(dealerId)},{$set:{deals:[...dealsData,dealsId]}},{new:true});
        res.status(201).send({status:true,data:result});
        
    }catch(error){
        return res.status(500).send({status:false,msg:"Server",error:error.message});
    };
};

export async function viewSoldVehiclesDealership(req,res){
    try{
        const db = await connectToDB();
        const dealerCollection = db.collection('dealership');
        const carsCollection = db.collection('sold_vehicles');
        const dealerId = req.params.dealerId;
        const dealerData = await dealerCollection.findOne({_id:ObjectId(dealerId)})
        const dealerVehicles = dealerData.sold_vehicles;
        let soldVehicles = [];
        for(let i of dealerVehicles){
            let data = await carsCollection.findOne({_id:ObjectId(i)});
            soldVehicles.push(data);
        }
        res.status(201).send({status:true,data:soldVehicles});
    }catch(error){
        return res.status(500).send({status:false,msg:"Server",error:error.message});
    };
};

export async function dealershipLogin (req,res){
    try{
        const db = await connectToDB();
        const dealerCollection = db.collection('dealership');
        const dealerData = req.body;
        const {email, password} = dealerData;

        const checkEmail = await dealerCollection.findOne({dealership_email:email});
        if(!checkEmail){
            return res.status(400).send({status:false,msg:"This email is not registered."});
        };
        let decryptPass = await bcrypt.compare(password,checkEmail.dealer_password);
        if(!decryptPass){
            return res.status(400).send({status:false,msg:"Password not matched"})
        };
        const token = jwt.sign({
            dealershipId:checkEmail._id,
            dealership_email:checkEmail.dealership_email
        },"dealership");

        res.status(201).send({status:true,token:token})
    }catch(error){
        return res.status(500).send({status:false,msg:"Server",error:error.message});
    };
};
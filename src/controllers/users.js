import UserModel from "../models/userModel.js";
import CarModel from "../models/carModel.js";
import DealershipModel from '../models/dealershipModel.js';
import { connectToDB } from "../database/db.js";
import {
  checkEmail,
  checkName,
} from "../middlewares/validations/validators.js";
import axios from "axios";
import bcrypt from "bcrypt";
import { ObjectId } from "mongodb";

export async function createUser(req, res) {
  try {
    const db = await connectToDB();
    const collection = db.collection("user");
    const userData = req.body;
    let { user_email, user_location, password, user_info, vehicle_info } =
      userData;

    if (!user_email || !checkEmail(user_email)) {
      return res
        .status(400)
        .send({ status: false, msg: "Enter the valid email address." });
    };

    const checkEmailInDB = await collection.findOne({ user_email: user_email });
    if (checkEmailInDB) {
      return res
        .status(400)
        .send({ status: false, msg: "This email is already registered" });
    };

    const geo = await axios.get(
      "https://api.ipgeolocation.io/ipgeo?apiKey=8a44eda6217642c88df4e07362275219"
    );
    user_location = geo.data.state_prov;

    const { name, username } = user_info;
    if (!name || !checkName(name)) {
      return res.status(400).send({ status: false, msg: "Enter a valid name" });
    };
    if (!username || !checkName(username)) {
      return res
        .status(400)
        .send({ status: false, msg: "Enter the a valid username" });
    };

    password = await bcrypt.hash(password, 10);

    if (vehicle_info.length === 0) {
      return res.status(400).send({ status: false, msg: "Enter vehicle info" });
    };

    let user = {
      user_email: user_email,
      user_location: user_location,
      password: password,
      user_info: user_info,
      vehicle_info: vehicle_info,
    };
    const newUser = new UserModel(user);
    await collection.insertOne(newUser);
    res.status(201).send({ status: true, data: newUser });
  } catch (error) {
    res
      .status(500)
      .send({ status: false, msg: "Server", error: error.message });
  };
};


export async function viewCars (req,res) {
    try{
        const db = await connectToDB();
        const collection = db.collection("cars");
        const carsData = await collection.find().toArray();
        res.status(201).send({status:true,data:carsData});
    }catch(error){
        res.status(500).send({status:false,msg:"Server",error:error.message})
    }
}

export async function delearshipCars (req,res) {
    try{
        const db = await connectToDB();
        const dealerCollection = db.collection("dealership");
        const carsCollection = db.collection("cars");

        const dealerIdParams = req.params.dealerId;
        const dealerData = await dealerCollection.findOne(ObjectId(dealerIdParams));
        const carsId = dealerData.cars;
        const carsData = [];
        for(let i of carsId){
            const data = await carsCollection.findOne(ObjectId(i));
            carsData.push(data);
        }
        console.log(carsData);
        res.status(201).send({status:true,data:carsData})
    }catch(error){
        return res.status(500).send({status:false,msg:"Server",error:error.message});
    };
};


export async function showDealershipAccToCarid (req,res){
    try{
        const db = await connectToDB();
        const dealerCollection = db.collection("dealership");
        const newDealership = await dealerCollection.find().toArray();
        const carId = req.params.carsId;
        const data = await newDealership.filter((i)=>{return i.cars.includes(carId)});
        
        const result = {
          dealership_email: data[0].dealership_email,
          dealership_name: data[0].dealership_name,
          dealership_location: data[0].dealership_location,
          dealership_info: data[0].dealership_info,
          cars: data[0].cars,
          deals: data[0].deals,
          sold_vehicles: data[0].sold_vehicles,
        };
        res.status(201).send({status:true,data:result});
    }catch(error){
        res.status(500).send({status:false,msg:"Server",error:error.message});
    };
};

export async function getAllSoldCars (req,res) {
    try{
        const db = await connectToDB();
        const collection = db.collection("sold_vehicles");
        const soldCars = await collection.find().toArray();
        console.log(soldCars)
    }catch(error){
        return res.status(500).send({status:false,msg:"Server",error:error.message})
    }
}

export async function dealsAcctoCarId(req,res){
    try{
        const db = await connectToDB();
        const collection = db.collection("deals");
        const carId = req.params.carId;
        const dealsList = await collection.findOne({car_id:ObjectId(carId)});
        res.status(201).send({status:true,data:dealsList});
    }catch(error){
        return res.status(500).send({status:false,msg:"Server",error:error.message});
    };
};

export async function dealsAccToDealership(req,res){
    try{
        const db = await connectToDB();
        const collection = db.collection("dealership");
        const dealCollection = db.collection("deals");

        let dealershipId = req.params.dealerId;
        let data = await collection.findOne({_id:ObjectId(dealershipId)});
        let dealer = data.deals;
        // console.log(dealer)
        const dealList = [];
        for(let i of dealer){
            let data = await dealCollection.findOne(ObjectId(i))
            dealList.push(data);
        }
        res.status(201).send({status:false,data:dealList});
       
    }catch(error){
        res.status(500).send({status:false,msg:"Server",error:error.message})
    }
}
// aaa1fac9061c00794509f146bbd8c055;
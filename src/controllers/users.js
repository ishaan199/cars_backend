import UserModel from "../models/userModel.js";
import CarModel from "../models/carModel.js";
import { connectToDB } from "../database/db.js";
import {
  checkEmail,
  checkName,
} from "../middlewares/validations/validators.js";
import axios from "axios";
import bcrypt from "bcrypt";

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
        
    }catch(error){
        return res.status(500).send({status:false,msg:"Server",error:error.message});
    };
};
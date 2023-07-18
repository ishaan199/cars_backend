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
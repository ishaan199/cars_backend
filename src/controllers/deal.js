import DealModel from '../models/dealModel.js';
import { connectToDB } from '../database/db.js';

export async function deals(req,res){
    try{
        const db = await connectToDB();
        const collection = db.collection("deals");
        let data = req.body;
              const { car_id, deal_info } = data;
              if (!car_id) {
                return resizeBy
                  .status(400)
                  .send({ status: false, msg: "Please Enter the car id." });
              }
              if (!deal_info.offers) {
                return res.status(400).send({status:false,msg:"Deal info should be present"});
              };
              const newDeals = new DealModel(data);
              await collection.insertOne(newDeals);
              return res.status(201).send({status:true,data:newDeals});
        console.log(data)
    }catch(error){
        res.status(500).send({status:false,msg:"Server",error:error});
    }
}
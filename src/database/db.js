import { MongoClient } from "mongodb";

const url = "mongodb+srv://ishaan:ishaan007@cluster1.wumfpap.mongodb.net/carSale";

// const dbName = "cars_sale";

// const client = new MongoClient(url);

// client.connect(function(err){
//   if(err){
//     console.error('Error connecting to DB : ' + err);
//     process.exit(1);
//   };
//   console.log("Connected to MongoDB");
// });

// export default client.db('cars_sale');


// async function connect(){
//   try{
//     const client = new MongoClient(url);
//     await client.connect();
//     return client.db();
//   }catch(error){
//     console.log("Failed to connect to the database", error);
//   };
// };

// const db = connect();

export async function connectToDB() {
  try {
    const client = new MongoClient(url);
    await client.connect();
    return client.db();
  } catch (error) {
    console.error("Failed to connect to the database", error);
    throw error;
  }
}


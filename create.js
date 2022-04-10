const { MongoClient } = require('mongodb');
const uri = process.env.MONGOSTRING;
const client = new MongoClient(uri);
require('dotenv').config();

async function run() {
  try {
    await client.connect();

    const database = client.db("insertDB");
    const haiku = database.collection("haiku"); 

    const doc = {
      name: 'Jander', 
      age: 24, 
      profession: 'Developer'
    }
    
    const result = await haiku.insertOne(doc);

    console.log(`A document was inserted with the _id: ${result.insertedId}`);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);

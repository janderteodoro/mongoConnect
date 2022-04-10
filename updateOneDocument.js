const { MongoClient } = require('mongodb');
require('dotenv').config();
const uri = process.env.MONGOSTRING;
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();

    const database = client.db("insertDB");
    const movies = database.collection("haiku");

    const filter = { name: "Jander" };

    // this option instructs the method to create a document if no documents match the filter
    const options = { upsert: true };

    // create a document that sets the plot of the movie
    const updateDoc = {
      $set: {
        name: `Esse nome foi alterado: ${Math.random()}`
      },
    };

    const result = await movies.updateOne(filter, updateDoc, options);
    console.log(
      `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`,
    );
  } finally {
    await client.close();
  }
}
run().catch(console.dir);

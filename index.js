const express = require('express');
const cors = require('cors');
const { MongoClient} = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
// to get posts req.body 
app.use(express.json());





const uri = "mongodb://0.0.0.0:27017/";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri);

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();


    const fashionItemCollection = client.db('fashionDB').collection('fashion');


    app.get('/products',async(req,res)=>{
      const cursor = fashionItemCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    })




    app.post('/products', async(req,res)=>{
      const newProducts = req.body;
      console.log(newProducts);
      const result = await fashionItemCollection.insertOne(newProducts);
      res.send(result);
    })


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);







app.get("/",(req,res)=>{
    res.send("Crud is running");
});

app.listen(port,()=>{
    console.log(`Simple Crud is running on Port ${port}`);
});
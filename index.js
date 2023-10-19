const express = require("express");
const cors = require("cors");
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;


// middleare

app.use(cors());
app.use(express.json());

// assignment-ten
// hsUXBGlZrOEhS9BF

// console.log(process.env.DB_USER);
// console.log(process.env.DB_PASS);

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.3pbm41d.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);
// const uri = "mongodb+srv://assignment-ten:hsUXBGlZrOEhS9BF@cluster0.3pbm41d.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const productCollection= client.db('productDB').collection('product');


app.get('/products', async (req,res)=>{
    const cursor=productCollection.find();
    const result = await cursor.toArray();
    res.send(result);
})



app.post('/products', async(req,res)=>{
    const newProduct=req.body;
    console.log(newProduct);
    const result=await productCollection.insertOne(newProduct);
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





app.get("/", (req, res) => {
    res.send("Crud is running...");
  });


  app.listen(port, () => {
    console.log(`Simple Crud is Running on port ${port}`);
  });
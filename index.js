const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;


// middleare

app.use(cors());
app.use(express.json());

// assignment-ten
// hsUXBGlZrOEhS9BF



const uri = "mongodb+srv://assignment-ten:hsUXBGlZrOEhS9BF@cluster0.3pbm41d.mongodb.net/?retryWrites=true&w=majority";

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
    const assignmentCollection= client.db('assinmentDB').collection('assignment');


app.get('/users', async (req,res)=>{
    const cursor=assignmentCollection.find();
    const result = await cursor.toArray();
    res.send(result);
})

app.post('/users', async(req,res)=>{
    const newCoffee=req.body;
    console.log(newCoffee);
    const result=await assignmentCollection.insertOne(newCoffee);
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
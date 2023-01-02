const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.oyqsogu.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });




async function run() {
  try {
    const PostCollection = client.db('Tochat').collection('post')
    const usersCollection = client.db("Tochat").collection("users");
    const commentCollection = client.db("Tochat").collection("comments");
    app.post("/users", async (req, res) => {
      const query = req.body;
      const result = await usersCollection.insertOne(query);
      res.send(result);
    });

    // Get user Profile
    app.get("/user", async (req, res) => {
      const userEmail = req.query.userEmail;
      const query = { userEmail: userEmail };
    
      const result = await usersCollection.findOne(query);
      res.send(result);
    });

    // Update a User get
    app.get("/user/:id", async (req, res) => {
      const id = req.params.id;
     
      const query = { _id: ObjectId(id) };
      const result = await usersCollection.findOne(query);
      res.send(result);
    });
    // Update a User Put
    app.put("/user", async (req, res) => {
      const userEmail = req.body.userEmail;
      const data = req.body;
      console.log(data);
      const query = { userEmail: userEmail };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          userName: data.userName,
          userEmail: data.userEmail,
          userPhoto: data.userPhoto,
          university: data.university,
          address: data.address,
          Phone: data.Phone,
          Birthday: data.Birthday,
          Gender: data.Gender,
        },
      };
      const result = await usersCollection.updateOne(query, updateDoc, options);
      res.send(result);
    });

    // PUT -- Update a User
    app.put("/users", async (req, res) => {
      const userEmail = req.body.userEmail;
      const data = req.body;
      const query = { userEmail: userEmail };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          userName: data.userName,
          userEmail: data.userEmail,
          userPhoto: data.userPhoto,
          university: data.university,
          address: data.address,
          Phone: data.Phone,
          Birthday: data.Birthday,
          Gender: data.Gender,
        },
      };
      const result = await usersCollection.updateOne(query, updateDoc, options);
      res.send(result);
    });



    // Post a Post
    app.post("/posts", async (req, res) => {
      const query = req.body;
      const result = await PostCollection.insertOne(query);
      res.send(result);
    });

    // Get all Post
    app.get("/posts", async (req, res) => {
      const query = {};
      const result = await PostCollection.find(query).toArray();
      res.send(result);
    });

    // Get post comment update
    app.post("/comments", async (req, res) => {
      const query = req.body;
      const result = await commentCollection.insertOne(query);
      res.send(result);
    });

    // Get one post
    app.get("/post/:id", async (req, res) => {
      const id = req.params.id;
      // console.log(id);
      const query = { _id: ObjectId(id) };
      const result = await PostCollection.findOne(query);
      res.send(result);
    });

    // get all Comments for one post
    app.get("/comments/:id", async (req, res) => {
      const id = req.params.id;

      const query = { postId: id };
      const result = await commentCollection.find(query).toArray();
      res.send(result);
    });














  }
  finally {

  }
}
run().catch((err) => console.log(err.message))

















app.get('/', async (req, res) => {
  res.send('server is running');
})

app.listen(port, () => console.log(`tooChat raning on port ${port}`))

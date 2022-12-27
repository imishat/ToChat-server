const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());


const uri =`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.oyqsogu.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });




async function run(){
    try{
        const PostCollection = client.db('Tochat').collection('post')

    }
    finally{
        
    }
}
run().catch((err)=>console.log(err.message))

















app.get('/', async (req, res) => {
    res.send('server is running');
})

app.listen(port, () => console.log(`tooChat raning on port ${port}`))

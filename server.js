import {MongoClient} from 'mongodb';

import express from "express";
import dotenv from "dotenv";
import fs from 'fs';
import connectDB from "./config/database.config.js";
import  bodyParser from 'body-parser';
import userRoutes from "./routes/userRoutes.js";

const client = new MongoClient('mongodb+srv://ameer12:ameer12@cluster0.sjc7z.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useUnifiedTopology:true });





dotenv.config();

connectDB();
// create express app
const app = express();


client.connect(function(err) {

    const db = client.db();
    const data = fs.readFileSync('file.json');
    const docs = JSON.parse(data.toString());
    
    db.collection('users')
        .insertMany(docs.users, function(err, result) {
            if (err) throw err;
            console.log('Inserted docs:', result.insertedCount);
            client.close();
    });
});



app.use(bodyParser.json())


app.use("/api/users", userRoutes);

   







// define a simple route
app.get('/', (req, res) => {
    res.send("Wellcome to the crud");
});

// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
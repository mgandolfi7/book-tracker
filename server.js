const express = require("express");
const bodyParser = require("body-parser")
const app = express();
const MongoClient = require("mongodb").MongoClient;
const PORT = 8000;
require("dotenv").config();


apiKey = process.env.API_KEY;

MongoClient.connect(apiKey, {useUnifiedTopology: true})
    .then(client => {
        console.log("Connected to MongoDB");
        const db = client.db("book-tracker");
        const bookCollection = db.collection("books");
        app.set("view engine", "ejs");

        app.get("/", (req, res) => {
            db.collection("books").find().toArray()
            .then(data => {
                res.render("/views/index.ejs", {info: data})
            })
            .catch(error => console.error(error))
        })  
    })

app.listen(PORT, (req, res) => {
    console.log(`Listening on port ${PORT}`);
});
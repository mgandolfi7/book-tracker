const express = require("express");
const app = express();
const MongoClient = require("mongodb").MongoClient;
const PORT = 8000;
require("dotenv").config();


apiKey = process.env.API_KEY;
dbName = "book-tracker"

MongoClient.connect(apiKey, {useUnifiedTopology: true})
    .then(client => {
        console.log("Connected to MongoDB");
        db = client.db(dbName);
    });

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));
app.use(express.json())

app.get("/", (req, res) => {
    db.collection("books").find().toArray()
    .then (data => {
        res.render("index.ejs", {info: data})
    })
    .catch(error => console.error(error))
});

app.post("/addBook", (req, res) => {
    db.collection("books").insertOne({bookTitle: req.body.bookTitle, bookAuthor: req.body.bookAuthor, checkoutDate: req.body.checkoutDate})
    .then(result => {
        console.log("book added")
        res.redirect("/")
    })
});

app.delete("/deleteBook", (req, res) => {
    db.collection("books").deleteOne({bookTitle: req.body.bookTitleS})
    .then (resut => {
        console.log("Book Deleted")
        res.json("Book Deleted")
    })
    .catch(error => console.error(error))
});

app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
});
var express = require("express");
var app = express()
var client= require("./Client.js"); //Router
var bodyParser = require("body-parser");

app.use(express.static("public"));
app.use(express.static("templates"));
app.use("/", client); //Use route in Client.js
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.set("view engine", "ejs");
app.set("views", "./templates");

//mongoose
    var mongoose = require("mongoose");

    var mongoDB = "mongodb://127.0.0.1/MongoData";
    mongoose.connect(mongoDB, { useNewUrlParser : true });

    var db = mongoose.connection;

    db.on("error", console.error.bind(console, "MongoDB connection error:"));
    console.log("connection MongoDB");
    //Schema
    var Schema = mongoose.Schema;

    var SignModelSchema = new Schema({
        firstname: String,
        lastname: String,
        username: String,
        password: String,
        email: String,
        numberphone: Number,
        address: String
    });

    var SignModel = mongoose.model("InfomationUsers", SignModelSchema);

//Get-Post-Data
app.post("/signUp/Invalite", function(req,res){
    var infoUser = {
        firstname: req.body.ten,
        lastname: req.body.ho,
        password: req.body.password,
        email: req.body.email,
        numberphone: req.body.numberphone,
        address: req.body.address
    };

    var getData = new SignModel({
        firstname: infoUser.firstname,
        lastname: infoUser.lastname,
        username: infoUser.username,
        password: infoUser.password,
        email: infoUser.email,
        numberphone: infoUser.numberphone,
        address: infoUser.address
    })

    getData.save(function(err){
        if(err) return handleError(err);
    })

    db.close();
    console.log("Disconnect mongoDB")
    res.render("user");
});

app.listen(3000);

var express = require("express");
var app = express();
app.use(express.static("public"));
app.use(express.static("templates"));
app.set("view engine", "ejs");
app.set("views", "./templates");
app.listen(3000);

var request = require("request");
var cheerio = require("cheerio");

app.get("/", function(req, res){
    request("http://vnexpress.net/kinh-doanh/bat-dong-san", function(error, response, body){
        if(error){
            console.log(error);
            res.render("index", {html:"error", img:"error"});
        }else{
            $ = cheerio.load(body);
            var ds = $(body).find(".title_news");
            var img = $(body).find(".vne_lazy_image");
            res.render("index", {html:ds, img:img});
        }
    })
})

app.get("/", function(req, res){
  res.render("index");
})
app.get("/homeSell", function(req, res){
  res.render("homeSell");
})
app.get("/homeRent", function(req, res){
  res.render("homeRent");
})
app.get("/apartmentSell", function(req, res){
  res.render("apartmentSell");
})
app.get("/apartmentRent", function(req, res){
  res.render("apartmentRent");
})
app.get("/groundSell", function(req, res){
  res.render("groundSell");
})
app.get("/groundRent", function(req, res){
  res.render("groundRent");
})
app.get("/landSell", function(req, res){
  res.render("landSell");
})
app.get("/landRent", function(req, res){
  res.render("landRent");
})
app.get("/signIn", function(req, res){
    res.render("signIn");
})
app.get("/signUp", function(req, res){
    res.render("signUp");
})

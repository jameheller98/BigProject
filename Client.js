var express = require("express");
var router = express.Router();
var request = require("request"); //Get data another web
var cheerio = require("cheerio");

router.get("/", function(req, res){
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
});
router.get("/homeSell", function(req, res){
  res.render("homeSell");
});
router.get("/homeRent", function(req, res){
  res.render("homeRent");
});
router.get("/apartmentSell", function(req, res){
  res.render("apartmentSell");
});
router.get("/apartmentRent", function(req, res){
  res.render("apartmentRent");
});
router.get("/groundSell", function(req, res){
  res.render("groundSell");
});
router.get("/groundRent", function(req, res){
  res.render("groundRent");
});
router.get("/landSell", function(req, res){
  res.render("landSell");
});
router.get("/landRent", function(req, res){
  res.render("landRent");
});
router.get("/signUp", function(req, res){
    res.render("signUp");
});
router.get("/signIn", function(req, res){
    res.render("signIn");
});

module.exports = router;

var express = require('express');
var bodyParser = require('body-parser')
var session = require("express-session")
var Passport = require('passport')
var LocalStratery = require('passport-local').Strategy
var fs = require('fs')
var app = express();
var router = express.Router();


//app.set("view engine", "ejs");
//app.set("views", "./templates"); 

app.use(bodyParser.urlencoded({extended:true}))
app.use(session({
    secret:"mysecret",
    cookie:{
        maxAge: 1000*6*5
    }
}))
app.use(Passport.initialize())
app.use(Passport.session())


app.route('/signIn')
.get((req,res)=> res.render('signIn'))
.post(Passport.authenticate('local',{failureRedirect:'/',successRedirect: '/'}))

app.get('/private',(req,res)=>{
    if(res.authenticate){
        res.send('welcome to private page')
    }else{
        res.send('ban chua dang nhap')
    }
});

//app.get('/loginOK',(req,res) => res.send("Ban da dang nhap thanh cong"))

Passport.use(new LocalStratery(
    (username,password , done) =>{
        fs.readFile('/userDB.json',(err,data)=>{
            var db = JSON.parse(data)
            var userRecord = db.find(user => user.usr == username)
            if (userRecord && userRecord.pwd == password){
                return done (null , userRecord)
            }else{
                return done(null ,false)
            }
        })
    }
))
Passport.serializeUser((user,done)=>{
    done(null,user.usr)
})

Passport.deserializeUser((name,done)=>{
    fs.readFile('/userDB.json',(err,data)=>{
        var db = JSON.parse(data)
        var userRecord = db.find(user => user.usr == name)
        if(userRecord){
            return done(null, userRecord)
        }else{
            return done (null,false)
        }
    })
})

module.exports=router;
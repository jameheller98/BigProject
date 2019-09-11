var express = require("express");
var app = express();
//Router sử dụng require để yêu cầu trang Client.js
var client= require("./routers/index");
// yêu cầu module body-parser để lấy dữ liệu từ form
var bodyParser = require("body-parser");
var assert = require("assert");

var SignUpModel = require("./routers/signup")

app.use(express.static("public"));
app.use("/", client); //Use route in Client.js
// sử dụng app.use để sử dụng module body-parser để yêu cầu lấy dữ liệu từ form
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.set("view engine", "ejs");
app.set("views", "./views");

//mongoose
var mongoose = require("mongoose");// require module mongoose

var mongoDB = "mongodb://127.0.0.1/MongoData";// save url
mongoose.connect(mongoDB, { useNewUrlParser : true });//create connect from mongoose

var db = mongoose.connection;// save connect

db.on("error", console.error.bind(console, "MongoDB connection error:"));//connect mongoDB with localhost
console.log("connection MongoDB");


//Get-Post-Data lấy dữ liệu và lưu dữ liệu vào MongoDB
app.post("/invalite-signup", function(req, res){
    var infoUser = {
        firstname: req.body.ten, // câu lệnh để lấy text từ form trong trang web
        lastname: req.body.ho,
        username: req.body.username,
        password: req.body.password,
        confirmpassword: req.body.confirmpassword,
        email: req.body.email,
        numberphone: req.body.numberphone,
        address: req.body.address
    };
    //Tạo biến có đối tượng schema để lưu dữ liệu
    if(infoUser.password == infoUser.confirmpassword){
        if(infoUser.confirmpassword == ""){
            req.flash("error1", 'Trường "Nhập lại mật khẩu" không được để trống!');
        };

        var getData = new SignUpModel({
            lastname: infoUser.lastname,      // gán dữ liệu vào các trường của schema
            firstname: infoUser.firstname,
            username: infoUser.username,
            password: infoUser.password,
            email: infoUser.email,
            numberphone: infoUser.numberphone,
            address: infoUser.address
        });
        //Sau khi có dữ liệu ta lưu lại vào database mongoDB bằng câu lệnh dưới

        getData.save(function(err){
            if(err) {
                //Nếu gặp lỗi ta sẽ bắt sữ kiện lỗi ta đã đặt ở trên và lưu vào giá trị error
                for(var key in err.errors){
                    //flash là module để hỗ trợ lưu các loại mesage và xuất ra file ejs
                    req.flash("error", err.errors[key].message);
                }
                //Trả về trang signUp sau khi lỗi
                res.redirect("http://localhost:3000/signUp");
            }else{
                console.log("Signup success!");
                //Trả về trang signIn nếu đăng ký thành công
                req.flash("success", "Bạn đã đăng ký thành công");
                res.redirect("http://localhost:3000/signIn");
            }
        })
    } else {
        req.flash("error1", 'Yêu cầu trường "Nhập lại mật khẩu" giống trường "Mật khẩu"');
        res.redirect("http://localhost:3000/signUp");
    }
});
//Lắng nghe port 3000
app.listen(3000);

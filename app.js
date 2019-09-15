const express = require('express');
const app = express();
// Router sử dụng require để yêu cầu trang Client.js
const client = require('./routers/index');
// yêu cầu module body-parser để lấy dữ liệu từ form
const bodyParser = require('body-parser');
const SignUpModel = require('./routers/signup');
app.use(express.static('public'));
app.use('/', client);

// sử dụng app.use để sử dụng module body-parser để yêu cầu lấy dữ liệu từ form
/* eslint object-curly-spacing: ["error", "always"]*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'ejs');
app.set('views', './views');
// mongoose
const mongoose = require('mongoose'); // require module mongoose

const mongoDB = 'mongodb://127.0.0.1/MongoData'; // save url
mongoose.connect(mongoDB, {
  useNewUrlParser: true,
}); // create connect from mongoose

const db = mongoose.connection; // save connect

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// connect mongoDB with localhost
console.log('connection MongoDB');


// Get-Post-Data lấy dữ liệu và lưu dữ liệu vào MongoDB
app.post('/invalite-signup', function(req, res) {
  const infoUser = {
    firstname: req.body.ten, // câu lệnh để lấy text từ form trong trang web
    lastname: req.body.ho,
    username: req.body.username,
    password: req.body.password,
    confirmpassword: req.body.confirmpassword,
    email: req.body.email,
    numberphone: req.body.numberphone,
    address: req.body.address,
  };
  // Tạo biến có đối tượng schema để lưu dữ liệu
  if (infoUser.password == infoUser.confirmpassword) {
    if (infoUser.confirmpassword == '') {
      req.flash('error1', 'Trường "Nhập lại mật khẩu" không được để trống!');
    };

    const getData = new SignUpModel({
      lastname: infoUser.lastname, // gán dữ liệu vào các trường của schema
      firstname: infoUser.firstname,
      username: infoUser.username,
      password: infoUser.password,
      email: infoUser.email,
      numberphone: infoUser.numberphone,
      address: infoUser.address,
    });
      // Sau khi có dữ liệu ta lưu lại vào database mongoDB bằng câu lệnh dưới

    getData.save(function(err) {
      if (err) {
        // Nếu gặp lỗi ta sẽ bắt sữ kiện lỗi
        for (const key in err.errors) {
          if (Object.prototype.hasOwnProperty.call(err.errors, key)) {
            // flash là module để hỗ trợ lưu các loại mesage và xuất ra file ejs
            req.flash('error', err.errors[key].message);
          }
        }
        // Trả về trang signUp sau khi lỗi
        res.redirect('http://localhost:3000/signUp');
      } else {
        console.log('Signup success!');
        // Trả về trang signIn nếu đăng ký thành công
        req.flash('success', 'Bạn đã đăng ký thành công');
        res.redirect('http://localhost:3000/signIn');
      }
    });
  } else {
    /* eslint max-len: ["error", { "ignoreStrings": true }]*/
    req.flash('error1', 'Yêu cầu trường "Nhập lại mật khẩu" giống trường "Mật khẩu"');
    res.redirect('http://localhost:3000/signUp');
  }
});
// Lắng nghe port 3000
app.listen(3000);

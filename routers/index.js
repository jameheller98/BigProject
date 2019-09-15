const express = require('express');
// Sử dụng module Router để liên kết 2 file Server.js và Client.js
const router = express.Router();
const flash = require('connect-flash'); // Sử dụng module flash
// Module yêu cầu lấy dữ liệu từ trang web khác
const request = require('request');
const cheerio = require('cheerio'); // Module để gọi tìm và trả về các elements
const session = require('express-session'); // Sử dụng module session
const cookieParser = require('cookie-parser'); // Sử dụng module cookie-parser

router.use(flash());
router.use(cookieParser());
router.use(session({
  secret: 'work hard',
  resave: true,
  saveUninitialized: false,
}));

router.get('/', function(req, res) {
  // Yêu cầu vào trang "http://vnexpress.net/kinh-doanh/bat-dong-san"
  request('http://vnexpress.net/kinh-doanh/bat-dong-san', function(error, response, body) {
    if (error) {
      console.log(error);
      // Nếu lỗi in ra lỗi và trả về trang chủ
      res.render('index', {
        html: undefined,
        img: undefined,
      });
    } else {
      // không lỗi thực hiện
      $ = cheerio.load(body); // đưa dữ liệu vào cheerio
      // từ dữ liệu tìm kiếm class title_news
      const ds = $(body).find('.title_news');
      // từ dữ liệu tìm kiếm class vne_lazy_image
      const img = $(body).find('.vne_lazy_image');
      res.render('index', {
        html: ds,
        img: img,
      });
      // Trả về trang chủ và lưu dữ liệu vào 2 object html và img
    }
  });
});
// Các router sự dụng .get để truyền dữ liệu
router.get('/homeSell', function(req, res) {
  res.render('homeSell'); // Phản hồi về trang homeSell.js
});
router.get('/homeRent', function(req, res) {
  res.render('homeRent');
});
router.get('/apartmentSell', function(req, res) {
  res.render('apartmentSell');
});
router.get('/apartmentRent', function(req, res) {
  res.render('apartmentRent');
});
router.get('/groundSell', function(req, res) {
  res.render('groundSell');
});
router.get('/groundRent', function(req, res) {
  res.render('groundRent');
});
router.get('/landSell', function(req, res) {
  res.render('landSell');
});
router.get('/landRent', function(req, res) {
  res.render('landRent');
});
router.get('/signUp', function(req, res) {
  // lưu flash vào object message
  res.render('signUp', {
    message: req.flash('error'),
    message1: req.flash('error1'),
  });
});
router.get('/signIn', function(req, res) {
  res.render('signIn', {
    message: req.flash('success'),
  });
});

module.exports = router; // đưa Client.js thành 1 module để gọi trong Server.js

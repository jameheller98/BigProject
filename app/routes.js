const request = require('request');
const cheerio = require('cheerio'); // Module để gọi tìm và trả về các elements
const User = require('../app/models/user');

module.exports = function(app, passport) {
  app.get('/', function(req, res) {
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
  app.get('/homeSell', function(req, res) {
    res.render('homeSell'); // Phản hồi về trang homeSell.js
  });
  app.get('/homeRent', function(req, res) {
    res.render('homeRent');
  });
  app.get('/apartmentSell', function(req, res) {
    res.render('apartmentSell');
  });
  app.get('/apartmentRent', function(req, res) {
    res.render('apartmentRent');
  });
  app.get('/groundSell', function(req, res) {
    res.render('groundSell');
  });
  app.get('/groundRent', function(req, res) {
    res.render('groundRent');
  });
  app.get('/landSell', function(req, res) {
    res.render('landSell');
  });
  app.get('/landRent', function(req, res) {
    res.render('landRent');
  });
  app.get('/signUp', function(req, res) {
    // lưu flash vào object message
    res.render('signUp', {
      message: req.flash('error'),
      message1: req.flash('error1'),
    });
  });
  app.get('/signIn', function(req, res) {
    res.render('signIn', {
      message: req.flash('success'),
      message1: req.flash('loginMessage'),
    });
  });
  app.post('/signIn', function(req, res, next) {
    passport.authenticate('local-signin', {
      successRedirect: '/profile',
      failureRedirect: '/signIn',
      failureFlash: true,
    })(req, res, next);
  });
  app.get('/profile', isLoggedIn, function(req, res) {
    res.render('profile', {
      user: req.user,
    });
  });
  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });
  app.post('/signUp', function(req, res) {
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

      const getData = new User({
        lastname: infoUser.lastname, // gán dữ liệu vào các trường của schema
        firstname: infoUser.firstname,
        username: infoUser.username,
        password: infoUser.password,
        email: infoUser.email,
        numberphone: infoUser.numberphone,
        address: infoUser.address,
      });
      if (getData.password != '') {
        getData.password = getData.generateHash(getData.password);
      }
      // Sau khi có dữ liệu ta lưu lại vào database mongoDB bằng câu lệnh dưới
      getData.save(function(err) {
        if (err) {
          // Nếu gặp lỗi ta sẽ bắt sữ kiện lỗi
          for (const key in err.errors) {
            if (Object.prototype.hasOwnProperty.call(err.errors, key)) {
              /* eslint max-len: ["error", { "ignoreStrings": true }]*/
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
};
const isLoggedIn = function(req, res, next) {
  // Nếu một user đã xác thực, cho đi tiếp
  if (req.isAuthenticated()) {
    return next();
  }
  // Nếu chưa, đưa về trang chủ
  res.redirect('/');
};

const request = require('request');
const cheerio = require('cheerio'); // Module để gọi tìm và trả về các elements
const User = require('../app/models/user');
const Postblog = require('../app/models/client');
/* eslint max-len: ["error", { "ignoreTrailingComments": true, "ignoreComments": true, "ignoreUrls": true, "ignoreStrings": true }]*/

module.exports = function(app, passport) {
  app.get('/', notisAdmin, function(req, res) {
    // Yêu cầu vào trang "http://vnexpress.net/kinh-doanh/bat-dong-san"
    request('http://vnexpress.net/kinh-doanh/bat-dong-san', function(error, response, body) {
      if (error) {
        console.log(error);
        // Nếu lỗi in ra lỗi và trả về trang chủ
        res.render('index', {
          html: undefined,
          img: undefined,
          user: req.user,
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
          user: req.user,
        });
        // Trả về trang chủ và lưu dữ liệu vào 2 object html và img
      }
    });
  });
  // Các router sự dụng .get để truyền dữ liệu
  app.get('/homeSell', notisAdmin, function(req, res) {
    res.render('homeSell', {
      user: req.user,
    }); // Phản hồi về trang homeSell.js
  });
  app.get('/homeRent', notisAdmin, function(req, res) {
    res.render('homeRent', {
      user: req.user,
    });
  });
  app.get('/apartmentSell', notisAdmin, function(req, res) {
    res.render('apartmentSell', {
      user: req.user,
    });
  });
  app.get('/apartmentRent', notisAdmin, function(req, res) {
    res.render('apartmentRent', {
      user: req.user,
    });
  });
  app.get('/groundSell', notisAdmin, function(req, res) {
    res.render('groundSell', {
      user: req.user,
    });
  });
  app.get('/groundRent', notisAdmin, function(req, res) {
    res.render('groundRent', {
      user: req.user,
    });
  });
  app.get('/landSell', notisAdmin, function(req, res) {
    res.render('landSell', {
      user: req.user,
    });
  });
  app.get('/landRent', notisAdmin, function(req, res) {
    res.render('landRent', {
      user: req.user,
    });
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
  app.get('/PostBlog', isLoggedIn, function(req, res) {
    res.render('PostBlog', {
      user: req.user,
    });
  });
  app.get('/signUp', isLoggedOut, function(req, res) {
    // lưu flash vào object message
    res.render('signUp', {
      message: req.flash('error'),
      message1: req.flash('error1'),
      message2: req.flash('error2'),
    });
  });
  app.get('/signIn', isLoggedOut, function(req, res) {
    res.render('signIn', {
      message: req.flash('success'),
      message1: req.flash('loginMessage'),
    });
  });
  app.get('/admin', isAdmin, function(req, res) {
    Postblog.find({})
        .then((postblogs) => {
          res.render('admin', {postblogs: postblogs, user: req.user});
        })
        .catch((err) => {
          console.log('Error: ', err);
          throw err;
        });
  });
  app.post('/signIn', function(req, res, next) {
    if (req.body.username == '' || req.body.password == '') {
      req.flash('loginMessage', 'Yêu cầu nhập tài khoản và mật khẩu!');
      res.redirect('/signIn');
    } else if (req.body.username == 'admin') {
      passport.authenticate('local-signin', {
        successRedirect: '/admin',
        failureRedirect: '/signIn',
        failureFlash: true,
      })(req, res, next);
    } else {
      passport.authenticate('local-signin', {
        successRedirect: '/',
        failureRedirect: '/signIn',
        failureFlash: true,
      })(req, res, next);
    }
  });
  app.get('/indexBlog', isLoggedIn, notisAdmin, (req, res) => {
    Postblog.find({'user': req.user})
        .then((postblogs) => {
          res.render('indexBlog', {postblogs: postblogs, user: req.user});
        })
        .catch((err) => {
          console.log('Error: ', err);
          throw err;
        });
  });
  app.post('/signUp', function(req, res) {
    res.locals.user = req.session.user;
    User.findOne({'username': req.body.username}, function(err, user) {
      if (err) throw err;
      if (user) {
        req.flash('error2', 'Tên tài khoản đã tồn tại!');
        res.redirect('/signUp');
      } else {
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
            isAdmin: false,
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
          req.flash('error1', 'Yêu cầu trường "Nhập lại mật khẩu" giống trường "Mật khẩu"');
          res.redirect('http://localhost:3000/signUp');
        }
      }
    });
  });
  app.post('/indexBlog', (req, res) => {
    const newPostblog = new Postblog({
      content: req.body.content,
      price: req.body.price,
      acreage: req.body.acreage,
      address: req.body.address,
      user: req.user,
    });
    newPostblog.save().then((doc) => {
      res.redirect('/indexBlog');
    })
        .catch((err) => {
          console.log('Error: ', err);
          throw err;
        });
  });
  app.get('/update-Blog/:postblogId', isLoggedIn, notisAdmin, (req, res) => {
    Postblog.findById(req.params.postblogId, (err, postblog) => {
      if (err) {
        console.log(err);
        throw err;
      }
      res.render('updateBlog', {postblog: postblog, user: req.user});
    });
  });
  app.delete('/:postblogId', (req, res) => {
    const postblogId = req.params.postblogId;
    Postblog.findByIdAndDelete(postblogId, (err, doc) => {
      if (err) throw err;
      res.send(doc);
    });
  });
  app.post('/:postblogId', (req, res) => {
    const postblogId = req.params.postblogId;
    Postblog.findByIdAndUpdate(
        {_id: postblogId},
        {$set: {content: req.body.content, price: req.body.price,
          acreage: req.body.acreage, address: req.body.address}},
        {userFindAndModify: false})
        .then((doc) => {
          res.redirect('/indexBlog');
        });
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
const isLoggedOut = function(req, res, next) {
  if (!req.isAuthenticated()) {
    // Nếu chưa, đưa về trang chủ
    return next();
  }
  // Nếu một user đã xác thực, cho đi tiếp
  res.redirect('/');
};
const isAdmin = function(req, res, next) {
  if (req.isAuthenticated() && req.user.isAdmin == true) {
    return next();
  }
  res.redirect('/');
};
const notisAdmin = function(req, res, next) {
  if (req.isAuthenticated() && req.user.isAdmin == true) {
    res.redirect('/admin');
  }
  return next();
};

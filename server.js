const express = require('express'); // yêu cầu module express
const app = express(); // biến app khai báo để thực thi file ejs
const port = process.env.PORT || 3000; // khai báo Port
const mongoose = require('mongoose'); // require module mongoose
const passport = require('passport');
const flash = require('connect-flash');
const morgan = require('morgan'); // yêu cầu module morgan
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser'); // yêu cầu module body-parser để lấy dữ liệu từ form
const session = require('express-session');
const multer = require('multer'); // yêu cầu module multer
const configDB = require('./config/database');
const uploadPost = multer({
  dest: 'public/uploads/post',
});
const uploadUser = multer({
  dest: 'public/uploads/user',
});
// mongoose
mongoose.connect(configDB.url,
    { useNewUrlParser: true, useUnifiedTopology: true });
/* eslint max-len: ["error", { "ignoreStrings": true }]*/
require('./config/passport')(passport);

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser());
// sử dụng app.use để sử dụng module body-parser để yêu cầu lấy dữ liệu từ form
/* eslint object-curly-spacing: ["error", "always"]*/
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(session({
  secret: 'userId',
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./app/routes.js')(app, passport, uploadPost, uploadUser);

// Lắng nghe port 3000
app.listen(port);
console.log('The magic happens on port' + port);

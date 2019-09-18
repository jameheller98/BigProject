const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose'); // require module mongoose
const passport = require('passport');
const flash = require('connect-flash');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser'); // yêu cầu module body-parser để lấy dữ liệu từ form
const session = require('express-session');
const configDB = require('./config/database');
// mongoose
mongoose.connect(configDB.url);
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

require('./app/routes.js')(app, passport);

// Lắng nghe port 3000
app.listen(port);
console.log('The magic happens on port' + port);

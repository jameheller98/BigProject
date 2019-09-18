const LocalStrategy = require('passport-local').Strategy;
const User = require('../app/models/user');

module.exports = function(passport) {
  console.log('begin passport!');
  passport.use('local-signin', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true,
  },
  function(req, username, password, done) {
    User.findOne({'username': username}, function(err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, req.flash('loginMessage',
            'Tên tài khoản không tồn tại!'));
      }
      if (!user.validPassword(password)) {
        return done(null, false, req.flash('loginMessage', 'Sai mật khẩu!'));
      }
      return done(null, user);
    });
  }));

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
};

'use strict';
var BasicStrategy = require('passport-http').BasicStrategy;
var User = require('../models/users');

module.exports = function(passport) {
  passport.use('basic', new BasicStrategy({
    //usernameField: 'name',
    usernameField: 'email',
    passwordField: 'password',
  },
  function(email, password, done) {
    User.findOne({'basic.email': email}, function(err, user) {
      if (err) return done('server error');

      if (!user) return done('email error');


      if (!user.validPassword(password)) return done('password error');

      return done(null, user);
    });
  }));
};

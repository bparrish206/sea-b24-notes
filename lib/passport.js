'use strict';
var BasicStrategy = require('passport-http').BasicStrategy;
var User = require('../models/users');

module.exports = function(passport) {
  passport.use('basic', new BasicStrategy(
    //usernameField: 'name',
    //usernameField: 'email',
    //passwordField: 'password',
  //},

  function(user, password, done) {
    User.findOne({'basic.email': user}, function(err, user) {
      if (err) return done('server error');
      if (!user) return done('no matchin email');
      if (!user.validPassword(password)) return done('password error');
      return done(null, user);
    });
  }));
};

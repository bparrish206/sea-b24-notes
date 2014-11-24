'use strict';

var BasicStrategy = require('passport-http').BasicStrategy;
var User = require('../models/users');

module.exports = function(passport){
  passport.use('basic', new BasicStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  function(email, password, done){
    User.findOne({'basic.email': email}, function(err, user){
      if(err) {
        console.log('error');
        return done('server error');
      }

      if(!user) {
        console.log(user);
        return done('access error');
      }

      if (!user.validPassowrd(password)) return done('access error');

    return done(null, user);

    });
  })
);
};
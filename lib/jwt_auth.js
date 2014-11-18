'use stict';
var jwt = require('jwt-simple');
var User = require('../models/users');

module.exports = function(secret){
  return function(req, res, next){
    var token = req.headers.jwt || req.body.jwt;

    var decoded;
    try {
      decoded = jwt.decode(token, secret);
    } catch(err) {
      console.log(err);
      res.status(403).send('access denied');
  }

  if((Date.now() - decoded.exp) > 85400000)
  return res.status(403).send('session is expired');

    User.findOne({__id: decoded.iss}, function(err, user){
      if (err) return res.status(403).send('access denied');
      if(!user) return res.status(403).send('access denied');


      req.user = user;
      next();
    });
  };
};

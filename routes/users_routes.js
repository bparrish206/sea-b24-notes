'use strict';

var User = require('../models/users');
var newName;

module.exports = function(app, passport) {
  app.get('/api/users', passport.authenticate('basic', {session: false}), function(req, res) {
    res.json({'jwt': req.user.generateToken(app.get('jwtSecret'))});
  });

  app.post('/api/users', function(req, res) {
    User.findOne({'basic.email': req.body.email}, function(err, user) {
      if (err) return res.status(500).send('server error');
      if (user) return res.status(500).send('cannot create that user');

      var newUser = new User();
      newUser.basic.name = req.body.name;
      newUser.basic.email = req.body.email;
      newUser.basic.password = newUser.generateHash(req.body.password);
      newUser.save(function(err, data) {
        newName = newUser.basic.name;
        if (err) return res.status(500).send('server error');
        res.json({Name: newUser.basic.name, 'jwt': newUser.generateToken(app.get('jwtSecret'))});
      });
    });
  });
};

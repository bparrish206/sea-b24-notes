'use strict';

var User = require('../models/users');
var bodyparser = require('body-parser');

module.exports = function(app, passport){
    app.get('/api/users', passport.authenticate('basic', {session: false}), function(req, res){
      res.json({'jwt': req.user.generateToken(app.get('jwtSecret'))});
    });

    app.post('/api/users', function(req, res){
      User.findOne({'basic.email': req.body.email}, function(err, user){
        if(err) return res.status(500).send('server error');
        if(!user) return res.status(500).send('cannot create that user');
        if (req.body.password !== req.body.confirmPassword)
        return res.status(500).send('invalid password');
        if(req.body.password.length<= 4) return res.status(500).send('Password must be at least 5 charecters long');

        var newUser = new User();
        newUser.basic.email = req.body.email;
        newUser.basic.password = newUser.generateHash(req.body.password);
        newUser.save(function(err, data){
          if(err) return res.status(500).send('server error');
          res.json({'jwt': newUser.generateToken(app.get('jwtSecret'))});
        });
      });
    });
};

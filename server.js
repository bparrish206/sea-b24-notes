var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var passport = require('passport');
var app = express();

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/notes_development');
app.use(bodyparser.json());
app.use(express.static(__dirname + '/build'));
app.set('jwtSecret', process.env.JWT_SECRET || 'changethisordie');

app.use(passport.initialize());
require('./lib/passport')(passport);

var jwtauth = require('./lib/jwt_auth')(app.get('jwtSecret'));

var notesRouter = express.Router();
notesRouter.use(jwtauth);


require('./routes/notes_routes')(app);
require('./routes/users_routes')(app, passport);

app.use(function(err, req, res, next) {
 res.status(500).send('error!');
});

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function() {
  console.log('server running on port: %d', app.get('port'));
});

module.exports = app;

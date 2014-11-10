var mondgoose = require('mongoos');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var express = require('express');
var app = express();

app.use(bodyparser.json());
app.set('jwtSecret', process.env.JWT_SECRET || 'changethisordie');
app.set('secret', process.env.SECRET || 'changethistoo');

app.use(passport.initialize());

require('./lib/passport')(passport);
require('./routes.users_routes')(app, passport);
require('./routes/notes_routes')(app);

var mongodbURL = "mongodb://heroku:LVZvO4MpsCjB90A3sa-wEN_FsRMYN-hxm1CdcMx0nSv7EwWqCmHSq_HRIgzc_UJj87u-jLv5LGBGEc8hhw0I4Q@dogen.mongohq.com:10041/app31416299";
mongoose.connect(process.env.MONGO_URL || mongodbURL);

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function() {
  console.log('server running on port: %d', app.get('port'));
});

var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var app = express();

app.use(bodyparser.json());
var mongodbURL = "mongodb://heroku:LVZvO4MpsCjB90A3sa-wEN_FsRMYN-hxm1CdcMx0nSv7EwWqCmHSq_HRIgzc_UJj87u-jLv5LGBGEc8hhw0I4Q@dogen.mongohq.com:10041/app31416299";
mongoose.connect(process.env.MONGO_URL || mongodbURL);


require('./routes/notes_routes')(app);

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function() {
  console.log('server running on port: %d', app.get('port'));
});

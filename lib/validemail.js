'use strict';

module.exports = function(req, res, next) {
    var txt = req.body.email;
    var vald = txt.indexOf('@');
    var vald2 = txt.indexOf('.');
    if(vald < 2 || vald2 < 2) {
      console.log("this email is not valid please try again.");
      return res.status(500).send('this email is not valid please try again.');
    }
  next()
}

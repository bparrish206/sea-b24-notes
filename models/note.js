var mongoose = require('mongoose');

var noteSchema = mongoose.Schema({
  noteBody: { type : String },
  date: {type: String},
  month: {type: String},
  time: { type: String},
  name: {type: String},
});

//noteSchema.path('noteBody').validate(function (val) {
  //return val === val.toLowerCase();
//}, "must be lowercase, no shouting!");


module.exports = mongoose.model('Note', noteSchema);

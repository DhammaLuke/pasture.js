var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// create schema for model
var CowSchema = new Schema ({
  name: String,
  age: Number,
  color: String
});
// export model
module.exports = mongoose.model('Cow', CowSchema);

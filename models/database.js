var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
var blogSchema = new mongoose.Schema({
  title: String,
  body: String,
  image: String,
  created: { type: Date, default: Date.now }
});

var Blog = mongoose.model('Blog', blogSchema);
module.exports = mongoose.model('', UserSchema);

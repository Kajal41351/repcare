var mongoose = require('mongoose');

var workerSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  image: String,
  address: String
  // comments: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: 'Comment'
  //   }
  // ]
});

module.exports = mongoose.model('Worker', workerSchema);

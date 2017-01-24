var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  username: String,
  password: String
});

var User = mongoose.model('user', userSchema);

module.exports = User;
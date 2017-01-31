var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  name: String,
  Surname: String,
  email: String,
  username: {
    type: String,
    unique: true
  },
  password: String
});

var User = mongoose.model('user', userSchema);

module.exports = User;

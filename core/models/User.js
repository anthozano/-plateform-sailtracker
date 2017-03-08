var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  name: String,
  surname: String,
  email: String,
  role: {
    _id: mongoose.Schema.Types.ObjectId,
    name: String
  },
  username: {
    type: String,
    unique: true
  },
  password: String
});

module.exports = mongoose.model('user', userSchema);

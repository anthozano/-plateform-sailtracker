var mongoose = require('mongoose');

var roleSchema = mongoose.Schema({
    name: {
      unique: true,
      type: String
    }
});

var Role = mongoose.model('role', roleSchema);

module.exports = Role;

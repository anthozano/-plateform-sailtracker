var mongoose = require('mongoose');

var sensorSchema = mongoose.Schema({
  type: String,
  data: [],
  site: {
    _id: mongoose.Schema.Types.ObjectId,
    name: String
  }
}, {timestamps: true});

module.exports = mongoose.model('sensor', sensorSchema);

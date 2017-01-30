var mongoose = require('mongoose');
var request = require('request');

var sensorSchema = mongoose.Schema({
  type: String,
  data: [],
  site: {
    _id: mongoose.Schema.Types.ObjectId,
    name: String
  }
}, {timestamps: true});

var Sensor = mongoose.model('sensor', sensorSchema);

module.exports = Sensor;

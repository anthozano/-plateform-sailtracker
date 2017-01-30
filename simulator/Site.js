var mongoose = require('mongoose');

var sensorSchema = mongoose.Schema({
  name: String
});

var Sensor = mongoose.model('site', sensorSchema);

module.exports = Sensor;

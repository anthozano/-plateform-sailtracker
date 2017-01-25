var mongoose = require('mongoose');

var sensorSchema = mongoose.Schema({
  "navigation": {
    "courseOverGround": {
      "value": Number
    }
  }
});

var Sensor = mongoose.model('sensor', sensorSchema);

module.exports = Sensor;

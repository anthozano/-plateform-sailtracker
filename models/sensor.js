var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  headingTrue: {
    value: Number,
    $source: String,
    sentence: String,
    timestamp: String
  }
});

var Sensor = mongoose.model('sensor', userSchema);

module.exports = Sensor;

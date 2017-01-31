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

sensorSchema.methods.sendData = function(target, method) {
  var options = {
    uri: target,
    method: method,
    json: this
  };
  console.log("Sending " + options.method + " request to " + options.uri);
  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log("Server response: " + body);
    }
  });
};

var Sensor = mongoose.model('sensor', sensorSchema);

module.exports = Sensor;

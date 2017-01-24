var request = require('request');

var Sensor = {
  sendRequest: function (target) {
    var options = {
      uri: "http://localhost:3000/simulator",
      method: 'POST',
      json: {
        "data": Math.random()
      }
    }
    console.log("Sending " + options.method + " request to " + options.uri);
    request(options, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        console.log("Server response: " + body);
      }
    })
  }
};

module.exports = Sensor;

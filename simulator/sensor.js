var request = require('request');

var Sensor = {
  sendRequest: function (target) {
    var options = {
      uri: "http://localhost:3000/simulator",
      method: 'POST',
      json: {
        "headingTrue": {
          "value": Math.floor(Math.random() * 360),
          "$source": "nmea0183-1.II",
          "sentence": "HDT",
          "timestamp": "2014-03-24T00:15:41Z"
        }
      }
    };
    console.log("Sending " + options.method + " request to " + options.uri);
    request(options, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        console.log("Server response: " + body);
      }
    });
  }
};

module.exports = Sensor;

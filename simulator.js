var fs = require('fs');
var ini = JSON.parse(fs.readFileSync('simulator.ini', 'utf8'));
var request = require('request');
var Site = require('./models/Site');
var Sensor = require('./models/Sensor');
/* var Mongoose = require('mongoose'); */

function sendRequest(sensorData) {
  var options = {
    uri: ini.target,
    method: 'POST',
    json: sensorData
  };
  console.log("Sending " + options.method + " request to " + options.uri);
  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log("Server response: " + body);
    }
  });
}

var sensors = [];

for (var i = 0; i < ini.topology.numberOfPartitions; i++) {
  var site = new Site({
    name: Math.random().toString(36).substring(7)
  });
  for (j in ini.topology.typesOfSensors) {
    var sensor = new Sensor({
      /* _id: Mongoose.Types.ObjectId(), */
      type: ini.topology.typesOfSensors[j].type,
      data: [],
      site: {
        _id: site._id,
        name: site.name
      }
    });
    // Building and pushing sensor data array
    for (k in ini.topology.typesOfSensors[j].data) {
      var name = ini.topology.typesOfSensors[j].data[k].name + "";
      var max = ini.topology.typesOfSensors[j].data[k].max;
      var min = ini.topology.typesOfSensors[j].data[k].min;
      var data = {};
      data[name] = (Math.random() * (max - min) + min);
      sensor.data.push(data);
    }
    sensors.push(sensor);
  }
}

for (s in sensors) {
  var timer = setInterval(sendRequest, 1000, sensors[s]);
  setTimeout(clearInterval, ini.runningTime * 1000, timer);
}

var fs = require('fs');
var ini = JSON.parse(fs.readFileSync('simulator.ini', 'utf8'));
var request = require('request');
var mongoose = require('mongoose');
var Util = require('./lib/Util');

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
    } else {
      console.log("Error" + response.statusCode + " response")
    }
  });
}


request({uri: 'http://localhost:3000/simulator/sites', method: 'GET'}, function (err, response, body) {
  if (!err && response.statusCode == 200) {
    sendData(JSON.parse(body));
  }
});

function sendData(dbSites) {
  var sites = dbSites;
  console.log(sites.length + " sites in database, " + ini.topology.numberOfPartitions + " expected");
  while (sites.length != ini.topology.numberOfPartitions) {
    if (sites.length > ini.topology.numberOfPartitions) {
      console.log("removing");
      for (var h = 0; h < sites.length - ini.topology.numberOfPartitions; h++) {
        request({uri: 'http://localhost:3000/sensors/' + sites[h]._id, method: 'DELETE'}, function (err, response, body) {
          if (!err && response.statusCode == 200) { }});
        sites.splice(h, 1);
      }
    } else if (sites.length < ini.topology.numberOfPartitions) {
      console.log("adding");
      sites.push({
        name: Util.randNameElite()
      });
    }
  }
  console.log("nothing more to do");

  var sensors = [];

  for (var i = 0; i < sites.length; i++) {
    for (j in ini.topology.typesOfSensors) {
      var sensor = {
        type: ini.topology.typesOfSensors[j].type,
        data: [],
        site: {
          _id: sites[i]._id,
          name: sites[i].name
        }
      };
      // Building and pushing sensor data array
      for (k in ini.topology.typesOfSensors[j].data) {
        var data = {};
        data[ini.topology.typesOfSensors[j].data[k].name] = (Math.random() * (ini.topology.typesOfSensors[j].data[k].max - ini.topology.typesOfSensors[j].data[k].min) + ini.topology.typesOfSensors[j].data[k].min);
        sensor.data.push(data);
      }
      sensors.push(sensor);
    }
  }
  for (s in sensors) {
    var timer = setInterval(sendRequest, Math.floor(Math.random() * 1000), sensors[s]);
    setTimeout(clearInterval, ini.runningTime * 1000, timer);
  }
}

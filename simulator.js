var request = require('request');
var fs = require('fs');
var Sensor = require('./simulator/sensor');
var ini = JSON.parse(fs.readFileSync('simulator.ini', 'utf8'));

console.log(ini)
for (var i = 0; i < ini.Topology.NumberOfPartitions; i++) {
  ini.Topology.TypesOfSensors.forEach(function(element) {
      for (var j = 0; j < ini.element.quantity; j++) {
        setInterval(Sensor.sendRequest(ini.Target), 2000);
      }
    })
}

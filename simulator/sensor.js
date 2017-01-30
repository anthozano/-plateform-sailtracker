var request = require('request');
// var HeadingSensor = require('HeadingSensor');
// var PositionSensor = require('PositionSensor');
var mongoObjectId = function () {
  var timestamp = (new Date().getTime() / 1000 | 0).toString(16);
  return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function() {
        return (Math.random() * 16 | 0).toString(16);
      }).toLowerCase();
};
var Sensor = {
  getData: function(type, values, site){
    function JSONtoString(vals) {
      var str = '';
      for(var keys = Object.keys(vals), i = 0, last = keys[keys.length-1]; i < keys.length; i++) {
        var key = keys[i], value = vals[key];
        str += '"' + key + '"' +': "' + value + '"' + (value === vals[last] ? '' : ', ');
      }
      return str;
    }
    var data = '{';
    data    += '"type": "' + type + '", ';
    data    += '"data": {';
    data    += JSONtoString(values);
    data    += '}, ';
    data    += '"site": {';
    data    += JSONtoString(site);
    data    += '}';
    data    += '}';
    console.log(data);
    return JSON.parse(data);
  },
  sendRequest: function (target) {
    var options = {
      uri: target,
      method: 'POST',
      json: Sensor.getData(
          "heading",
          {"value": (Math.random() * 360)},
          {"_id": mongoObjectId(), "name": "Les mouettes"}
      )
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

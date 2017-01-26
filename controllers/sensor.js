var Sensor = require('../models/sensor');

var SensorController = {
  create: function(req, res) {
    sensor = new Sensor(req.body);
    sensor.save(function(err, sensor) {
      if (err) {
        res.sendStatus(400);
      } else {
        res.sendStatus(200);
      }
    });
  },
  read: function(req, res) {
    Sensor.find({"_id": req.params.id}, function(err, sensor) {
      if (err) {
        res.sendStatus(404);
      } else {
        res.send(sensor);
      }
    });
  },
  update: function(req, res) {
    Sensor.findOneAndUpdate({"_id": req.params.id}, req.body, function (err, sensor) {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      } else {
        res.sendStatus(200);
      }
    })
  },
  delete: function(req, res) {
    Sensor.findOneAndRemove({"_id": req.params.id}, function (err, sensor) {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      } else {
        res.sendStatus(200);
      }
    })
  }
};

module.exports = SensorController;

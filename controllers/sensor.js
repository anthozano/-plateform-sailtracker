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
    console.log(req.params.id);
    Sensor.find({"_id": "5888af354a3eb933809f6517"}, function(err, sensor) {
      if (err) {
        res.sendStatus(404);
      } else {
        res.sendStatus(200);
      }

    })
  },
  update: function(req, res) {
    Sensor.findOneAndUpdate({"_id": req.params.id}, req.body, function (err, sensor) {
      if (err) {
        console.log(err);
      } else {
        res.sendStatus(200);
      }
    })
  },
  delete: function(req, res) {
    Sensor.findOneAndRemove({"_id": req.params.id}, function (err, sensor) {
      if (err) {
        console.log(err);
      } else {
        res.sendStatus(200);
      }
    })
  },
};

module.exports = SensorController;

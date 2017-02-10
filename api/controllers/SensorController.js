var Sensor = require('../models/Sensor');
var Mongoose = require('mongoose');

var SensorController = {

  create: function(req, res) {
    sensor = new Sensor(req.body);
    sensor._id = Mongoose.Types.ObjectId();
    sensor.save(function(err, s) {
      if (err) {
        res.sendStatus(400);
        console.log(err);
      } else {
        console.log(s._id);
        res.sendStatus(200);
      }
    });
  },

  read: function(req, res) {
    Sensor.findOne({"_id": req.params.id}, function(err, sensor) {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else if (sensor == null) {
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
  },

  test: function (req, res) {
    console.log(req.body);
    res.sendStatus(200);
  }
};

module.exports = SensorController;

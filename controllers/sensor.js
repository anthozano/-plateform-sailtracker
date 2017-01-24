var Sensor = require('../models/sensor');

var SensorController = {
  index: function (req, res) {
    Sensor.find(function (err, sensors) {
      if (err) return console.error(err);
      res.render('sensor/index', {"sensors": sensors});
    });
  },
  show: function (req, res) {
    Sensor.findOne({"_id": req.params.id}, function (err, sensor) {
      if (err) return console.error(err);
      res.render('sensor/show', {"sensor": sensor});
    });
  },
  create: function (req, res) {},
  edit: function (req, res) {
    Sensor.findOne({"_id": req.params.id}, function (err, sensor) {
      if (err) return console.error(err);
      res.render('sensor/edit', {"sensor": sensor});
    });
  },
  update: function (req, res) {
    console.log(req.body);
    var sensor = new Sensor({
      "_id": req.body._id,
      "headingTrue": {
        "value": req.body.value,
        "$source": req.body.source,
        "sentence": req.body.sentence,
        "timestamp": req.body.timestamp
      }
    });
    sensor.update(function (err, sensor) {
      if (err) return console.error(err);
    });
    res.redirect('/sensors');
  },
  store: function (req, res) {},
  delete: function (req, res) {},
};

module.exports = SensorController;
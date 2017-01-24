var Sensor = require('../models/sensor');

var SensorController = {
  index: function (req, res) {
    Sensor.find(function (err, sensors) {
      if (err) return console.error(err);
      res.render('sensor/index', {"sensors": sensors});
    });
  },
  show: function (req, res) {
    Sensor.findOne({"_id": req.params.id},function (err, sensor) {
      if (err) return console.error(err);
      res.render('sensor/show', {"sensor": sensor});
    });  }
};

module.exports = SensorController;
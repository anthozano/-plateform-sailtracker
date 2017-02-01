var Sensor = require('../models/Sensor');
var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/sailtracker')


var DashboardController = {
  index: function (req, res) {
    var sensors = [];
    var cursor = Sensor.aggregate(
        [
          {$match: {type: "speed"}},
          {$unwind: "$data"},
          {
            $group: {
              _id: "$site._id",
              speedAvg: {$avg: "$data.value"}
            }
          }
        ]).cursor().exec();
    cursor.each(function (err, sensor) {
      if (err) {
        console.log(err);
        res.send(err);
      }
      sensors.push(sensor);
    });
    console.log(sensors);
    res.render('dashboard/index')
  }
};

module.exports = DashboardController;

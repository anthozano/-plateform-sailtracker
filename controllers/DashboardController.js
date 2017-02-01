var Sensor = require('../models/Sensor');
var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/sailtracker')


var DashboardController = {
  index: function (req, res) {
    Sensor.aggregate(
        [
          {$match: {type: "speed"}},
          {$unwind: "$data"},
          {
            $group: {
              _id: "$site.name",
              speedAvg: {$avg: "$data.value"}
            }
          }
        ]).exec(function (err, speed) {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        var datah = [];
        var datar = [];
        for (var i = 0; i < speed.length; i++) {
          datah.push('"' + speed[i]._id + '"');
          datar.push(speed[i].speedAvg);
        }
        res.render('dashboard/index', {datahs: datah, datars: datar})
      }
    });
  }
};

module.exports = DashboardController;

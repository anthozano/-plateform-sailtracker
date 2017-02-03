var Sensor = require('../models/Sensor');
var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/sailtracker')


var DashboardController = {
  index: function (req, res) {
    var speedAvgQuery = Sensor.aggregate([
      {$match: {type: "speed"}},
      {$unwind: "$data"},
      {
        $group: {
          _id: "$site.name",
          speedAvg: {$avg: "$data.value"}
        }
      },
      {$sort: {speedAvg: -1}}
    ]);
    var headingAvgQuery = Sensor.aggregate([
      {$match: {type: "heading"}},
      {$unwind: "$data"},
      {
        $group: {
          _id: "$type",
          headingAvg: {$avg: "$data.value"}
        }
      }
    ]);
    speedAvgQuery.exec(function (err, speedAvg) {
        if (err) {
          console.log(err);
          res.send(err);
        } else {
          var datah = [];
          var datar = [];
          for (var i = 0; i < speedAvg.length; i++) {
            datah.push('"' + speedAvg[i]._id + '"');
            datar.push(speedAvg[i].speedAvg);
          }
          headingAvgQuery.exec(function (err, headingAvg) {
            if (err) {
              console.log(err);
              res.send(err);
            } else {
              console.log(headingAvg);
              res.render('dashboard/index', {headings: headingAvg, speeds: speedAvg, datars: datar, datahs: datah})
            }
          });
        }
      }
    );
  }
};

module.exports = DashboardController;

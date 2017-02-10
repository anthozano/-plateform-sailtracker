var Sensor = require('../models/Sensor');

var DashboardController = {
  index: function (req, res) {
    var top5Query = Sensor.aggregate([
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
    var speedAvgQuery = Sensor.aggregate([
      {$match: {type: "speed"}},
      {$unwind: "$data"},
      {
        $group: {
          _id: "$site.name",
          speedAvg: {$avg: "$data.value"}
        }
      },
      {$limit: 10}
    ]);
    var activityQuery = Sensor.aggregate([
      {$unwind: "$data"},
      {
        $group: {
          _id: "$site.name",
          count: {$sum: 1}
        }
      },
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
    activityQuery.exec(function (err, activity) {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        var activityh = [];
        var activityr = [];
        for (var i = 0; i < activity.length; i++) {
          activityh.push('"' + activity[i]._id + '"');
          activityr.push(activity[i].count);
        }
        top5Query.exec(function (err, top5) {
          if (err) {
            console.log(err);
            res.send(err);
          } else {
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
                      res.render('dashboard/index', {
                        headings: headingAvg,
                        speeds: top5,
                        datars: datar,
                        datahs: datah,
                        activityhs: activityh,
                        activityrs: activityr
                      })
                    }
                  });
                }
              }
            );
          }
        });
      }
    });
  }
};

module.exports = DashboardController;

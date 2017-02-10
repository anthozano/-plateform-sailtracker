var Sensor = require('../models/Sensor');

var DashboardController = {
  index: function (req, res) {
    res.render('dashboard/index');
  },

  mail: function (re, res) {
    res.redirect('/dashboard');
  },

  /**
   * Fetch data for speed average bar chart
   * @param re
   * @param res
   */
  speedAverage: function (re, res) {
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
    speedAvgQuery.exec(function (err, speedAvg) {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        var arraySpeedAvg = [];
        for (var i = 0; i < speedAvg.length; i++) {
          arraySpeedAvg.push([
            speedAvg[i]._id,
            speedAvg[i].speedAvg
          ]);
        }
        res.send(JSON.stringify(arraySpeedAvg));
      }
    });
  },

  /**
   * Fetch data for top 5 table
   * @param re
   * @param res
   */
  top5: function (re, res) {
    Sensor.aggregate([
      {$match: {type: "speed"}},
      {$unwind: "$data"},
      {
        $group: {
          _id: "$site.name",
          speedAvg: {$avg: "$data.value"}
        }
      },
      {$sort: {speedAvg: -1}},
      {$limit: 5}
    ]).exec(function (err, results) {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        var array = [];
        console.log(results);
        for (var i = 0; i < results.length; i++) {
          array.push({no: i + 1, boat: results[i]._id,  speed: Math.floor(results[i].speedAvg * 100) / 100})
        }
        res.send(JSON.stringify(array))
      }
    });
  },

  /**
   * Fetch data for heading average display
   * @param re
   * @param res
   */
  headingAverage: function (re, res) {
    Sensor.aggregate([
      {$match: {type: "heading"}},
      {$unwind: "$data"},
      {
        $group: {
          _id: "$type",
          headingAvg: {$avg: "$data.value"}
        }
      }
    ]).exec(function (err, results) {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        res.send(JSON.stringify(Math.floor(results[0].headingAvg)));
      }
    });
  },

  /**
   * Fetch data for activity pie chart
   * @param re
   * @param res
   */
  activityPie: function (re, res) {
    var activityQuery = Sensor.aggregate([
      {$unwind: "$data"},
      {
        $group: {
          _id: "$site.name",
          count: {$sum: 1}
        }
      }
    ]);
    activityQuery.exec(function (err, results) {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        var array = [];
        for (var i = 0; i < results.length; i++) {
          array.push([results[i]._id, results[i].count])
        }
        res.send(JSON.stringify(array));
      }
    });
  },

  /**
   * Fetch data for activity over time chart
   * @param re
   * @param res
   */
  activityTime: function (re, res) {
    var activityTimeQuery = Sensor.aggregate([
      {$unwind: "$data"},
      {
        $group: {
          _id: {boat: "$site.name", timestamp: "$createdAt"},
          count: {$sum: 1}
        }
      },
      {$limit: 100}
    ]);
    activityTimeQuery.exec(function (err, results) {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        var array = [];
        for (var i = 0; i < results.length; i++) {
          array.push([
            results[i]._id.boat,
            results[i]._id.timestamp,
            results[i].count,
          ]);

        }
        console.log(results);
        res.send(JSON.stringify(array));
      }
    });
  }
};

module.exports = DashboardController;

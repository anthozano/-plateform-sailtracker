var Sensor = require('../models/Sensor');
var request = require('request');
var mailer = require('express-mailer');
var fs = require('fs');
var path = require('path');
var pdf = require('html-pdf');
var cheerio = require('cheerio');
var express = require('express');
var app = express();

// Mailer setup
mailer.extend(app, {
  transport: 'SMTP',
  config: {
    service: 'Gmail',
    auth: {
      user: 'anthoamx@gmail.com',
      pass: 'froufrou'
    }
  },
  defaults: {
    from: 'anthoamx@gmail.com'
  }
});

// view engine setup
app.set('views', path.join(__dirname, '/../views'));
app.set('view engine', 'pug');

/**
 *
 * @type {{index: DashboardController.index, mail: DashboardController.mail, speedAverage: DashboardController.speedAverage, top5: DashboardController.top5, headingAverage: DashboardController.headingAverage, activityPie: DashboardController.activityPie}}
 */
var DashboardController = {
  index: function (req, res) {
    res.render('dashboard/index');
  },
  
  /**
   * Send a report email
   * @param request
   * @param result
   */
  mail: function (request, result) {
    var $ = cheerio.load(request.body.html);
    $("a").remove();
    $("form").remove();
    $("button").remove();
    pdf.create($.html()).toFile('ressources/report.pdf', function (err, res) {
      if (err) {
        console.log(err);
        result.status(500).send(err);
      } else {
        app.mailer.send('mails/report', {
          to: 'sailtracker@anthozano.fr', // REQUIRED. This can be a comma delimited string just like a normal email to field.
          subject: 'BI Report', // REQUIRED.
          attachments: {
            filename: "report.pdf",
            filepath: "ressources/report.pdf"
          }
        }, function (error, response) {
          if (error) {
            console.log(error);
            result.status(500).send(error);
          } else {
            console.log('Message sent: ' + response.message);
            result.sendStatus(200);
          }
        });
      }
    });
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
        for (var i = 0; i < results.length; i++) {
          array.push({no: i + 1, boat: results[i]._id, speed: Math.floor(results[i].speedAvg * 100) / 100})
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
        if (results.length > 0) {
          res.send(JSON.stringify(Math.floor(results[0].headingAvg)));
        } else {
          res.send(JSON.stringify(0));
        }
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
};

module.exports = DashboardController;

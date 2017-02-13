var sensor = require('../models/Sensor');
var site = require('../models/Site');

var SimulatorController = {
  test: function (req, res) {
    console.log(req.body);
    res.sendStatus(200);
  },

  sites: function (req, res) {
    site.find(function (err, sites) {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        res.send(sites);
      }
    });
  }
};

module.exports = SimulatorController;

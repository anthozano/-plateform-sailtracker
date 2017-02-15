var Sensor = require('../models/Sensor');

var LiveMapController = {
  index: function (req, res) {
    Sensor.aggregate([
      {$match: {type: "position"}},
      {
        $group: {
          _id: {name: "$site.name",
            positions: "$data"}
        }
      },
      {$sort: {createdAt: -1}},
      {$limit: 10}
    ], function(err, results) {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        var boats = [];
        for (var i = 0; i < results.length; i++) {
          boats.push({
            name: results[i]._id.name,
            lat: results[i]._id.positions[0].lat,
            lng: results[i]._id.positions[1].lng
          })
        }
        console.log(boats);
        res.render('livemap/index', {boats: JSON.stringify(boats)});
      }
    });
  }
};

module.exports = LiveMapController;

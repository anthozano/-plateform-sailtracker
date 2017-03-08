var User = require('../models/User');
var api_key = "05ba2107a34eb81c90e147ec8677bf68997884ed70c6268f86fcf6dbd41f74e6";

module.exports = function (req, res, next) {
  if (req.get('api_key') == api_key) {
    User.findOne({api_secret: req.get('api_secret')}, function(err, result) {
      if (!err && result) {
        next();
      } else {
        console.log(err);
        res.status(500).send("Wrong api key/secret");
      }
    })
  } else {
    res.status(500).send("Wrong api key/secret");
  }
};
var mongoose = require('mongoose');

var siteSchema = mongoose.Schema({
  name: String
}, {timestamps: true});

var Site = mongoose.model('site', siteSchema);

module.exports = Site;

var Site = require('../models/Site');
var request = require('request');

var host = "http://localhost:3000";

var SiteController = {
  
  list: function (req, res) {
    request({uri: host + "/sites/index", method: "GET"}, function (error, response) {
      if (!error && response.statusCode == 200) {
        res.render('omc/sites/index', {sites: response.body});
      } else {
        res.send(error);
      }
    });
  },
  
  show: function (req, res) {
    request({uri: host + "/sites/" + req.id + "/show", method: "GET"}, function (error, response, body) {
      res.render("omc/sites/show", {sites: body});
    });
  },
  
  edit: function (req, res) {
    request({uri: host + "/sites/" + req.id + "/edit", method: "GET"}, function (error, response, body) {
      res.render("omc/sites/edit", {sites: body});
    });
  },
  
  index: function (req, res) {
    Site.find({}, function (err, results) {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      } else {
        res.status(200).send(results);
      }
    });
  },
  
  /**
   *
   * @param req
   * @param res
   */
  create: function (req, res) {
    Site.create(req.body, function (err, created) {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      } else {
        res.status(200).send(created);
      }
    });
  },
  
  /**
   *
   * @param req
   * @param res
   */
  read: function (req, res) {
    Site.findOne({_id: req.params.id}, function (err, result) {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      } else {
        res.status(200).send(result);
      }
    });
  },
  
  /**
   *
   * @param req
   * @param res
   */
  update: function (req, res) {
    Site.findOneAndUpdate({_id: req.params.id}, req.body, function (err, updated) {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      } else {
        res.status(200).send(updated);
      }
    });
  },
  
  /**
   *
   * @param req
   * @param res
   */
  delete: function (req, res) {
    Site.findOneAndRemove({_id: req.params.id}, function (err, removed) {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      } else {
        res.status(200).send(removed);
      }
    });
  }
  
  ,
};

module.exports = SiteController;

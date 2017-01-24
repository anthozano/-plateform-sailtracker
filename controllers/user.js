var mongoose = require('mongoose');
var model = require('../models/user');
module.exports.controller = function (app) {

  /**
   * a home page route
   */
  app.get('/home', function (req, res) {
    res.render('users/signed');
  });

  app.get('/login', function (req, res) {
    res.render('users/login');
  });

  app.post('/login', function (req, res) {
    if (req.session.attempt) {
      req.session.attempt = req.session.attempt ? 1 : req.session.attempt++;
    }
    //console.log(req.session);
    res.render('users/login');
  });

}
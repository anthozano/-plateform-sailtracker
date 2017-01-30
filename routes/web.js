var express = require('express');
var router = express.Router();

var UserController = require('../controllers/UserController');
var LiveMapController = require('../controllers/LiveMapController');
var DashboardController = require('../controllers/DashboardController');

var Sensor = require('../models/Sensor');
var Site = require('../models/Site');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'SailTracker' });
});

// User
router.get('/signin', UserController.signin);
router.post('/signin', UserController.login);

router.get('/signup', UserController.signup);
router.post('/signup', UserController.create);
router.get('/home', UserController.home);

// Livemap
router.get('/livemap', LiveMapController.index);

// Dashboard
router.get('/dashboard', DashboardController.index);

var SensorController = require('../controllers/SensorController');

module.exports = router;

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
router.get('/login', UserController.index);
router.post('/login', UserController.login);
router.get('/home', UserController.home);

router.get('/livemap', LiveMapController.index);

router.get('/dashboard', DashboardController.index);

var SensorController = require('../controllers/SensorController');

// Sensor
router.post('/sensors/create', SensorController.create);
router.get('/sensors/:id/read', SensorController.read);
router.put('/sensors/:id/update', SensorController.update);
router.delete('/sensors/:id/delete', SensorController.delete);

router.post('/sensors/test', SensorController.test);


module.exports = router;

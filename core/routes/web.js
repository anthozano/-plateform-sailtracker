var express = require('express');
var router = express.Router();

var UserController = require('../controllers/UserController');
var LiveMapController = require('../controllers/LiveMapController');
var DashboardController = require('../controllers/DashboardController');

var Sensor = require('../models/Sensor');
var Site = require('../models/Site');

var logger = require('../middlewares/auth');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'SailTracker' });
});

// User
router.get('/signin', UserController.signin);
router.post('/signin', UserController.login);

router.use(logger);

router.get('/signup', UserController.signup);
router.get('/home', UserController.home);
router.get('/logout', UserController.logout);
router.post('/signup', UserController.create);

router.get('/users', UserController.index);
router.post('/users/create', UserController.create);
router.get('/users/:id', UserController.read);
router.get('/users/:id/edit', UserController.edit);
router.post('/users/:id/update', UserController.update);
router.post('/users/:id/delete', UserController.delete);

// Livemap
router.get('/livemap', LiveMapController.index);

var SensorController = require('../controllers/SensorController');

module.exports = router;

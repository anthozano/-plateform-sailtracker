var express = require('express');
var router = express.Router();

var UserController = require('../controllers/UserController');
var LiveMapController = require('../controllers/LiveMapController');
var DashboardController = require('../controllers/DashboardController');
var SiteController = require('../controllers/SiteController');

var Sensor = require('../models/Sensor');
var Site = require('../models/Site');

var admin = require('../middlewares/admin');
var gold = require('../middlewares/gold');
var silver = require('../middlewares/silver');

/* GET home page. */
router.get('/', function(req, res) {
  if (req.session.message) {
    res.locals.message = req.session.message;
    req.session.message = undefined;
  }
  res.render('index', { title: 'SailTracker' });
});

// User
router.get('/signin', UserController.signin);
router.post('/signin', UserController.login);
router.get('/signup', UserController.signup);
router.post('/signup', UserController.create);

// router.use(logger);

router.get('/home', silver, UserController.home);
router.get('/logout', UserController.logout);

router.get('/users', admin, UserController.index);
router.post('/users/create', admin, UserController.create);
router.get('/users/:id', admin, UserController.read);
router.get('/users/:id/edit', admin,UserController.edit);
router.post('/users/:id/update', admin,UserController.update);
router.post('/users/:id/delete', admin,UserController.delete);

// Livemap
router.get('/livemap', silver, LiveMapController.index);

// web
router.get("/sites", admin, SiteController.list);
router.get("/sites/:id/show", admin, SiteController.show);
router.get("/sites/:id/edit",admin, SiteController.edit);

// Dashboard
router.get('/dashboard', gold, DashboardController.index);


module.exports = router;

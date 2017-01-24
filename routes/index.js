var express = require('express');
var router = express.Router();
var fs = require('fs');

var UserController = require('../controllers/user');
var SensorController = require('../controllers/sensor');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// User
router.get('/login', UserController.index);
router.post('/login', UserController.login);
router.get('/home', UserController.home);

// Simulator
router.get('/sensors', SensorController.index);
router.get('/sensor/:id', SensorController.show);
router.get('/sensor/create', SensorController.create);
router.get('/sensor/:id/edit', SensorController.edit);
router.post('/sensor/store', SensorController.store);
router.post('/sensor/:id/update', SensorController.update);
router.post('/sensor/:id/delete', SensorController.delete);

module.exports = router;

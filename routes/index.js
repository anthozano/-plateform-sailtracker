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

// Sensor
router.post('/sensors/create', SensorController.create);
router.get('/sensors/:id/read', SensorController.read);
router.put('/sensors/:id/update', SensorController.update);
router.delete('/sensors/:id/delete', SensorController.delete);

router.post('/simulator', function (req, res) {
  console.log(req.body);
  res.write("Data received");
});

module.exports = router;

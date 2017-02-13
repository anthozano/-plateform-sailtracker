var express = require('express');
var router = express.Router();

var SensorController = require('../controllers/SensorController');

// Sensor
router.post('/sensors/create', SensorController.create);
router.get('/sensors/:id', SensorController.read);
router.put('/sensors/:id', SensorController.update);
router.delete('/sensors/:id', SensorController.delete);

module.exports = router;

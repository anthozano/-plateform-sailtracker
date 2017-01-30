var express = require('express');
var router = express.Router();

var SensorController = require('../controllers/SensorController');

// Sensor
router.post('/sensors/create', SensorController.create);
router.get('/sensors/:id/read', SensorController.read);
router.put('/sensors/:id/update', SensorController.update);
router.delete('/sensors/:id/delete', SensorController.delete);

router.post('/sensors/test', SensorController.test);

module.exports = router;

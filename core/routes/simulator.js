var express = require('express');
var router = express.Router();

var SimulatorController = require('../controllers/SimulatorController');

router.post('/sensors/test', SimulatorController.test);

router.get('/simulator/sites', SimulatorController.sites);

module.exports = router;

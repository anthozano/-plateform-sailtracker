var express = require('express');
var router = express.Router();

var DashboardController = require('../controllers/DashboardController');

var logger = require('../middlewares/logger');

// Dashboard
router.get('/dashboard', logger, DashboardController.index);
router.get('/dashboard/speedAverage', logger, DashboardController.speedAverage);
router.get('/dashboard/top5', logger, DashboardController.top5);
router.get('/dashboard/headingAverage', logger, DashboardController.headingAverage);
router.get('/dashboard/activityPie', logger, DashboardController.activityPie);
router.post('/dashboard/mail', logger, DashboardController.mail);

module.exports = router;

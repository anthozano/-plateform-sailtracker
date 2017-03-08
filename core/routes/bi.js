var express = require('express');
var router = express.Router();

var DashboardController = require('../controllers/DashboardController');

var logger = require('../middlewares/auth');

// Dashboard
router.get('/dashboard', logger, DashboardController.index);
router.get('/dashboard/speedAverage', DashboardController.speedAverage);
router.get('/dashboard/top5', DashboardController.top5);
router.get('/dashboard/headingAverage', DashboardController.headingAverage);
router.get('/dashboard/activityPie', DashboardController.activityPie);
router.post('/dashboard/mail', DashboardController.mail);

module.exports = router;

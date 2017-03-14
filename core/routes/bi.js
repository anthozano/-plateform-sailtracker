var express = require('express');
var router = express.Router();

var DashboardController = require('../controllers/DashboardController');

var gold = require('../middlewares/gold');

// Dashboard
router.get('/dashboard', gold, DashboardController.index);
router.get('/dashboard/speedAverage', DashboardController.speedAverage);
router.get('/dashboard/top5', DashboardController.top5);
router.get('/dashboard/headingAverage', DashboardController.headingAverage);
router.get('/dashboard/activityPie', DashboardController.activityPie);
router.post('/dashboard/mail', DashboardController.mail);

module.exports = router;

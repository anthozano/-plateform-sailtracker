var express = require('express');
var router = express.Router();

var apichecker = require('../middlewares/apichecker.js');

var SiteController = require('../controllers/SiteController');

// api
router.get("/sites/index", apichecker, SiteController.index);
router.post("/sites/create", apichecker, SiteController.create);
router.get("/sites/:id", apichecker, SiteController.read);
router.put("/sites/:id", apichecker,  SiteController.update);
router.delete("/sites/:id", apichecker, SiteController.delete);

module.exports = router;

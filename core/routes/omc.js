var express = require('express');
var router = express.Router();

var SiteController = require('../controllers/SiteController');

// web
router.get("/sites", SiteController.list);
router.get("/sites/:id/show", SiteController.show);
router.get("/sites/:id/edit", SiteController.edit);

// api
router.get("/sites/index", SiteController.index);
router.post("/sites/create", SiteController.create);
router.get("/sites/:id", SiteController.read);
router.put("/sites/:id", SiteController.update);
router.delete("/sites/:id", SiteController.delete);

module.exports = router;

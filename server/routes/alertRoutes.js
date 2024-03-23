const express = require("express");
const router = express.Router();
const alertController = require("../controllers/alertController")

// get all task details
router.get("/",alertController.getAllAlert);

// add alert with auto generated id
router.post("/",alertController.addAlert);

module.exports = router;
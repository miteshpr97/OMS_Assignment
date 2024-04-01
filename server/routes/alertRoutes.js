const express = require("express");
const router = express.Router();
const alertController = require("../controllers/alertController")

// get all alert details
router.get("/",alertController.getAllAlert);

// add alert with auto generated id
router.post("/",alertController.addAlert);

// delete alert details
router.delete("/delete/:AlertID",alertController.deleteAlertDetails);

module.exports = router;
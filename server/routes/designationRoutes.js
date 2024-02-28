const express = require("express");
const router = express.Router();
const designationController = require("../controllers/designationController");

// Get all designation
router.get("/", designationController.getAllDesignations);

// Get particular designation by their id
router.get("/:DesignationID", designationController.getDesignationById);

// Add a new designation with auto generated id
router.post("/withID", designationController.addDesignationWithId);

// Update designation's data
router.patch("/update/:DesignationID", designationController.updateDesignation);

// Deleting designation's data
router.delete("/delete/:DesignationID",designationController.deleteDesignation);

module.exports = router;

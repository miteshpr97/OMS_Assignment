const express = require("express");
const router = express.Router();
const complaintController = require("../controllers/complaintController");

//getting all complaint
router.get("/",complaintController.getAllComplaints);

// Add a new complaint with auto generated id
router.post("/",complaintController.addComplaint);

// Updating complaint's data
router.patch("/update/:ComplaintID", complaintController.updateComplaint);

// Deleting complaint's data
router.delete("/delete/:ComplaintID", complaintController.deleteComplaint);

module.exports = router;
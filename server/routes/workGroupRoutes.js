const express = require("express");
const router = express.Router();
const workGroupController = require("../controllers/workGroupController");

// Get all work groups
router.get("/", workGroupController.getAllWorkGroups);

//get all data from employee table using join and merged it with work group table
router.get("/allData", workGroupController.getAllworkGroupEmployeesData);

// Get all data about a particular group
router.get("/:EmployeeID_Assigner", workGroupController.getAllDataOfOneGroup);

// Add a new work group
router.post("/", workGroupController.addWorkGroup);

// Add a new work group
router.post("/multiple", workGroupController.insertMultipleWorkGroup);

// Update work group's data
router.patch("/update/:WorkGroupID", workGroupController.updateWorkGroup);

// Deleting a work group
router.delete("/delete/:WorkGroupID", workGroupController.deleteWorkGroup);

module.exports = router;

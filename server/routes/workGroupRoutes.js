const express = require("express");
const router = express.Router();
const workGroupController = require("../controllers/workGroupController");

// Get all work groups
router.get("/", workGroupController.getAllWorkGroups);

// Get tasks of particular team  
router.get("/task/:EmployeeID_Assigner", workGroupController.getTasksOfParticularTeam);

// Get tasks with work group information 
router.get("/task", workGroupController.getAllTasks);

// Get tasks of particular employee of particular team 
// router.get("/task/:EmployeeID_Assigner/:EmployeeID_AssignTo", workGroupController.getTasksOfParticularEmployee);

//get all data from employee table using join and merged it with work group table
router.get("/allData", workGroupController.getAllWorkGroupEmployeesData);

// Get all data about a particular group
router.get("/:EmployeeID_Assigner", workGroupController.getAllDataOfOneGroup);

// Add new multiple work group
router.post("/multiple", workGroupController.insertMultipleWorkGroup);

// Update work group's data
router.patch("/update/:WorkGroupID", workGroupController.updateWorkGroup);

// Deleting a work group
router.delete("/delete/:WorkGroupID", workGroupController.deleteWorkGroup);

module.exports = router;

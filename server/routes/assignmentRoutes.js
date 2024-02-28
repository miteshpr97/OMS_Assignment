const express = require("express");
const router = express.Router();
const assignmentController = require("../controllers/assignmentControllers");

// get all Assignment
router.get("/", assignmentController.getAllAssignments); 

// all assignment show with their names (Mitesh)
router.get('/allData', assignmentController.getAssignmentEmployeesData);

// get particular Assignment by their id
router.get("/:AssignmentID", assignmentController.getAssignmentById); 

// add Assignment with auto generated id
router.post("/withID", assignmentController.addAssignmentWithId);

// update assignment
router.patch("/update/:AssignmentID", assignmentController.updateAssignment);

// update assignment status to progress
router.patch("/:AssignmentID/progress", assignmentController.progressAssignmentStatus);

// update assignment status to completed
router.patch("/:AssignmentID/completed", assignmentController.completedAssignmentStatus);

// number of pending progress and completed assignments of a particular employee
router.get("/:EmployeeID_AssignTo/assignmentCounts", assignmentController.numberOfAssignmentsByStatus);

// delete assignment
router.delete("/delete/:AssignmentID", assignmentController.deleteAssignment);


module.exports = router;

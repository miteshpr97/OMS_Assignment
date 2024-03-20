const express = require("express");
const router = express.Router();
const testAssignmentController = require("../controllers/testAssignmentController");

// get all Assignment
router.get("/", testAssignmentController.getAllAssignments);

// add Assignment with auto generated id
router.post("/", testAssignmentController.addAssignment);

// all assignment show with their names (Mitesh)
router.get("/allData", testAssignmentController.getAssignmentEmployeesData);

// get particular Assignment by their id
router.get(
  "/:AssignmentID/:EmployeeID/:EmployeeID_AssignTo",
  testAssignmentController.getAssignmentById
);

// update assignment
router.patch(
  "/update/:AssignmentID/:EmployeeID/:EmployeeID_AssignTo",
  testAssignmentController.updateAssignment
);

// update assignment status to Reject
router.patch(
  "/:AssignmentID/:EmployeeID/:EmployeeID_AssignTo/reject",
  testAssignmentController.updateAssignmentStatusToReject
);

// update assignment status to progress
router.patch(
  "/:AssignmentID/:EmployeeID/:EmployeeID_AssignTo/progress",
  testAssignmentController.updateAssignmentStatusToProgress
);

// update assignment status to Regret
router.patch(
  "/:AssignmentID/:EmployeeID/:EmployeeID_AssignTo/regret",
  testAssignmentController.updateAssignmentStatusToRegret
);

// Reassigning the assignment to another employee
router.patch(
  "/:AssignmentID/:EmployeeID/:EmployeeID_AssignTo/reassign",
  testAssignmentController.reassignAssignment
);

// update assignment status to completed
router.patch(
  "/:AssignmentID/:EmployeeID/:EmployeeID_AssignTo/completed",
  testAssignmentController.updateAssignmentStatusToCompleted
);

// number of pending,progress,reject,regret and completed assignments of a particular employee
router.get(
  "/:EmployeeID_AssignTo/assignmentCounts",
  testAssignmentController.numberOfAssignmentsByStatus
);

// delete assignment
router.delete(
  "/delete/:AssignmentID/:EmployeeID/:EmployeeID_AssignTo",
  testAssignmentController.deleteAssignment
);

module.exports = router;

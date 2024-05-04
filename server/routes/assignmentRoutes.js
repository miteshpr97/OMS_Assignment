const express = require("express");
const router = express.Router();
const assignmentController = require("../controllers/assignmentController");

// get all Assignment
router.get("/", assignmentController.getAllAssignments);

// add Assignment with auto generated id
router.post("/", assignmentController.addAssignment);

// add Assignment for multiple employees
router.post("/multiple", assignmentController.addAssignmentForMultipleEmployee);

// all assignment show with their names (Mitesh)
router.get("/allData", assignmentController.getAssignmentEmployeesData);

// get particular Assignment by their id
router.get(
  "/:AssignmentID/:EmployeeID/:EmployeeID_AssignTo",
  assignmentController.getAssignmentById
);

// update assignment
router.patch(
  "/update/:AssignmentID/:EmployeeID/:EmployeeID_AssignTo",
  assignmentController.updateAssignment
);

// update assignment status to Reject
router.patch(
  "/:AssignmentID/:EmployeeID/:EmployeeID_AssignTo/reject",
  assignmentController.updateAssignmentStatusToReject
);

// update assignment status to progress
router.patch(
  "/:AssignmentID/:EmployeeID/:EmployeeID_AssignTo/progress",
  assignmentController.updateAssignmentStatusToProgress
);

// update assignment status to Regret
router.patch(
  "/:AssignmentID/:EmployeeID/:EmployeeID_AssignTo/regret",
  assignmentController.updateAssignmentStatusToRegret
);

// Reassigning the assignment to another employee
router.patch(
  "/:AssignmentID/:EmployeeID/:EmployeeID_AssignTo/reassign",
  assignmentController.reassignAssignment
);

// update assignment status to closed
router.patch(
  "/:AssignmentID/:EmployeeID/:EmployeeID_AssignTo/closed",
  assignmentController.updateAssignmentStatusToClosed
);

// number of pending,progress,reject,regret and completed assignments of a particular employee
router.get(
  "/:EmployeeID_AssignTo/assignmentCounts",
  assignmentController.numberOfAssignmentsByStatus
);

// delete assignment
router.delete(
  "/delete/:AssignmentID/:EmployeeID/:EmployeeID_AssignTo",
  assignmentController.deleteAssignment
);

module.exports = router;

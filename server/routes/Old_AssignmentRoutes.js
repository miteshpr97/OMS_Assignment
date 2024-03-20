const express = require("express");
const router = express.Router();
const assignmentController = require("../controllers/Old_AssignmentControllers");

// get all Assignment
router.get("/", assignmentController.getAllAssignments);

// all assignment show with their names (Mitesh)
router.get("/allData", assignmentController.getAssignmentEmployeesData);

// get particular Assignment by their id
router.get("/:AssignmentID", assignmentController.getAssignmentById);

// add Assignment with auto generated id
router.post("/", assignmentController.addAssignment);

// update assignment
router.patch("/update/:AssignmentID", assignmentController.updateAssignment);

// update assignment status to Reject
router.patch(
  "/:AssignmentID/reject",
  assignmentController.updateAssignmentStatusToReject
);

// update assignment status to progress
router.patch(
  "/:AssignmentID/progress",
  assignmentController.updateAssignmentStatusToProgress
);

// update assignment status to Regret
router.patch(
  "/:AssignmentID/regret",
  assignmentController.updateAssignmentStatusToRegret
);

// update assignment status to completed
router.patch(
  "/:AssignmentID/completed",
  assignmentController.updateAssignmentStatusToCompleted
);

// number of pending,progress,reject,regret and completed assignments of a particular employee
router.get(
  "/:EmployeeID_AssignTo/assignmentCounts",
  assignmentController.numberOfAssignmentsByStatus
);

// delete assignment
router.delete("/delete/:AssignmentID", assignmentController.deleteAssignment);

module.exports = router;

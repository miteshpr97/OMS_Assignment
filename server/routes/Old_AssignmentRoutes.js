const express = require("express");
const router = express.Router();
const oldAssignmentController = require("../controllers/Old_AssignmentControllers");

// get all Assignment
router.get("/", oldAssignmentController.getAllAssignments);

// all assignment show with their names (Mitesh)
router.get("/allData", oldAssignmentController.getAssignmentEmployeesData);

// get particular Assignment by their id
router.get("/:AssignmentID", oldAssignmentController.getAssignmentById);

// add Assignment with auto generated id
router.post("/", oldAssignmentController.addAssignment);

// update assignment
router.patch("/update/:AssignmentID", oldAssignmentController.updateAssignment);

// update assignment status to Reject
router.patch(
  "/:AssignmentID/reject",
  oldAssignmentController.updateAssignmentStatusToReject
);

// update assignment status to progress
router.patch(
  "/:AssignmentID/progress",
  oldAssignmentController.updateAssignmentStatusToProgress
);

// update assignment status to Regret
router.patch(
  "/:AssignmentID/regret",
  oldAssignmentController.updateAssignmentStatusToRegret
);

// update assignment status to completed
router.patch(
  "/:AssignmentID/completed",
  oldAssignmentController.updateAssignmentStatusToCompleted
);

// number of pending,progress,reject,regret and completed assignments of a particular employee
router.get(
  "/:EmployeeID_AssignTo/assignmentCounts",
  oldAssignmentController.numberOfAssignmentsByStatus
);

// delete assignment
router.delete("/delete/:AssignmentID", oldAssignmentController.deleteAssignment);

module.exports = router;

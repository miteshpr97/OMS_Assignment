


const express = require("express");
const router = express.Router();
const assignmentController = require("../controllers/assignmentControllers");

// Routes related to assignments


// asignments get/post use routes
router.route("/")
    .get(assignmentController.getAllAssignments)
    .post(assignmentController.addAssignment);


    // asignments post genrate assignmentId in this routes
router.route("/withID")
    .post(assignmentController.addAssignmentWithId);

router.route("/data")
    .post(assignmentController.addAssignmentData);

router.route("/allData")
    .get(assignmentController.getAssigmentEmployeesData);

router.route("/lastAssignmentId")
    .get(assignmentController.getLastAssignmentId);

router.route("/nextAssignmentId")
    .get(assignmentController.getNextAssignmentId);

router.route("/:AssignmentID")
    .patch(assignmentController.updateAssignment)
    .delete(assignmentController.deleteAssignment);

router.route("/:AssignmentID/progress")
    .patch(assignmentController.progressAssignmentStatus);

router.route("/:AssignmentID/completed")
    .patch(assignmentController.completedAssignmentStatus);



// number of pending progress and completed assignments of an employee
router.get("/:EmployeeID_AssignTo/assignmentCounts", assignmentController.numberOfAssignmentsByStatus);

module.exports = router;



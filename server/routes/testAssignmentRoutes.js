const express = require("express");
const router = express.Router();
const testAssignmentController = require("../controllers/testAssignmentController");

// get all Assignment
router.get("/", testAssignmentController.getAllAssignments); 

// // all assignment show with their names (Mitesh)
// router.get('/allData', assignmentController.getAssignmentEmployeesData);

// // get particular Assignment by their id
// router.get("/:AssignmentID", assignmentController.getAssignmentById); 

// // add Assignment with auto generated id
// // router.post("/withID", assignmentController.addAssignmentWithId);

// add Assignment with auto generated id
router.post("/",testAssignmentController.addAssignment);



module.exports = router;

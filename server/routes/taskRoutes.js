const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");

// get all task details
router.get("/", taskController.getAllTasks);

// get particular task details by id
router.get("/:TaskID", taskController.getTaskById);

// add task details with auto generated id
router.post("/withID", taskController.addTaskWithId);

// update task status to progress
router.patch("/:TaskID/progress", taskController.progressTaskStatus);

// update task status to completed
router.patch("/:TaskID/closed", taskController.closedTaskStatus);

// update task details
router.patch("/update/:TaskID", taskController.updateTask);

// number of pending progress and completed tasks of a particular employee
router.get("/:EmployeeID/taskCounts", taskController.numberOfTasksByStatus);

// delete task details
router.delete("/delete/:TaskID", taskController.deleteTask);


module.exports = router;

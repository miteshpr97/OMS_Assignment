const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskControllers");

// get all task details
router.get("/", taskController.getAllTasks);

// add task details
router.post("/", taskController.addTask);

// get last task id
router.get("/lastTaskId", taskController.getLastTaskId);

// get next task id
router.get("/nextTaskId", taskController.getNextTaskId);

// update task details
router.patch("/update/:TaskID", taskController.updateTask);

// delete task details
router.delete("/delete/:TaskID", taskController.deleteTask);


module.exports = router;

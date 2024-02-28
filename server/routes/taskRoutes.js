const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskControllers");

// get all task details
router.get("/", taskController.getAllTasks);

// get particular task details by id
router.get("/:TaskID", taskController.getTaskById);

// add task details with auto generated id
router.post("/withID", taskController.addTaskWithId);

// update task details
router.patch("/update/:TaskID", taskController.updateTask);

// delete task details
router.delete("/delete/:TaskID", taskController.deleteTask);


module.exports = router;

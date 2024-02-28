const { queryAsync } = require("../db");

// Get All Tasks

exports.getAllTasks = async (req, res) => {
  try {
    const query = "SELECT * FROM tb_task";
    const results = await queryAsync(query);
    res.status(200).json(results);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get Task By ID

exports.getTaskById = async (req, res) => {
  const taskId = req.params.TaskID;
  try {
    const query = "SELECT * FROM tb_task WHERE TaskID = ?";
    const results = await queryAsync(query, [taskId]);
    res.status(200).json(results);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Add Task With ID

exports.addTaskWithId = async (req, res) => {
  const newTask = req.body;
  newTask.TaskStatus = newTask.TaskStatus || "Pending";
  newTask.Type = newTask.Type || "T";

  try {
    const maxIDQuery = "SELECT MAX(SUBSTRING(TaskID, 2)) AS maxID FROM tb_task";
    const results = await queryAsync(maxIDQuery);

    let nextID = 1;

    if (results && results[0].maxID !== null) {
      nextID = parseInt(results[0].maxID, 10) + 1;
    }

    const formattedID = `T${nextID.toString().padStart(3, "0")}`;
    newTask.TaskID = formattedID;

    const insertQuery = "INSERT INTO tb_task SET ?";
    await queryAsync(insertQuery, newTask);

    res.status(200).json({ message: "Task added successfully" });
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update Task

exports.updateTask = async (req, res) => {
  const taskId = req.params.TaskID;
  const updatedTask = req.body;
  const updateQuery = "UPDATE tb_task SET ? WHERE TaskID = ?";

  try {
    const results = await queryAsync(updateQuery, [updatedTask, taskId]);

    if (results.affectedRows === 0) {
      res.status(404).json({ error: "Task not found" });
    } else if (results.affectedRows > 0 && results.changedRows === 0) {
      res.status(200).json("Task's data is up to date already");
    } else {
      res.status(200).json({ message: "Task updated successfully" });
    }
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete Task

exports.deleteTask = async (req, res) => {
  const taskId = req.params.TaskID;
  const deleteQuery = "DELETE FROM tb_task WHERE TaskID = ?";

  try {
    const results = await queryAsync(deleteQuery, [taskId]);

    if (results.affectedRows === 0) {
      res.status(404).json({ error: "Task not found" });
    } else {
      res.status(200).json({ message: "Task deleted successfully" });
    }
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

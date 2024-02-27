const db = require("../db");

// Getting all tasks

exports.getAllTasks = (req, res) => {
  const query = "SELECT * FROM tb_task";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.status(200).json(results);
    }
  });
};

// Getting particular task's data by id

exports.getTaskById = (req, res) => {
  const taskId = req.params.TaskID;
  const query = "SELECT * FROM tb_task WHERE TaskID = ?";
  db.query(query, taskId, (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.status(200).json(results);
    }
  });
};

// inserting task with auto generated id from backend

exports.addTaskWithId = (req, res) => {
  const newTask = req.body;

  newTask.TaskStatus = newTask.TaskStatus || "Pending";
  newTask.Type = newTask.Type || "T";

  const query = "SELECT MAX(SUBSTRING(TaskID, 2)) AS maxID FROM tb_task";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error getting max TaskID: ", err);
      res.status(500).json({ error: "Internal server error" });
      return;
    }

    let nextID = 1;

    if (results && results[0].maxID !== null) {
      nextID = parseInt(results[0].maxID, 10) + 1;
    }

    const formattedID = `T${nextID.toString().padStart(3, "0")}`;

    newTask.TaskID = formattedID;

    const query = "INSERT INTO tb_task SET ?";
    db.query(query, newTask, (err, results) => {
      if (err) {
        console.error("Error executing query:", err);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        res.status(200).json({ message: "Task added successfully" });
      }
    });
  });
};

// updating task's data

exports.updateTask = (req, res) => {
  const taskId = req.params.TaskID;
  const updatedTask = req.body;
  const query = "UPDATE tb_task SET ? WHERE TaskID = ?";

  db.query(query, [updatedTask, taskId], (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      if (results.affectedRows === 0) {
        res.status(404).json({ error: "Task not found" });
        return;
      } else if (results.affectedRows > 0 && results.changedRows === 0) {
        res.status(200).json("Task's data is up to date already");
        return;
      } else {
        res.status(200).json({ message: "Task updated successfully" });
      }
    }
  });
};

// Deleting Task's data

exports.deleteTask = (req, res) => {
  const taskId = req.params.TaskID;
  const query = "DELETE FROM tb_task WHERE TaskID = ?";
  db.query(query, [taskId], (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      if (results.affectedRows === 0) {
        res.status(404).json({ error: "Task not found" });
        return;
      } else {
        res.status(200).json({ message: "Task deleted successfully" });
      }
    }
  });
};

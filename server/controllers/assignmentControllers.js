const {db} = require("../db");

// Getting all assignment

exports.getAllAssignments = (req, res) => {
  const query = "SELECT * FROM tb_assignment";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.status(200).json(results);
    }
  });
};

// Getting particular assignment's data by id

exports.getAssignmentById = (req, res) => {
  const assignmentId = req.params.AssignmentID;
  const query = "SELECT * FROM tb_assignment WHERE AssignmentID = ?";
  db.query(query, assignmentId, (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.status(200).json(results);
    }
  });
};

// get all data with name (Mitesh)

exports.getAssigmentEmployeesData = (req, res) => {
  const query = `
  SELECT 
  w.*, 
  e1.FirstName AS Assigner_FirstName, 
  e1.LastName AS Assigner_LastName,
  e2.FirstName AS Assignee_FirstName,
  e2.LastName AS Assignee_LastName
FROM 
  tb_assignment AS w
  INNER JOIN 
  tb_employee AS e1 ON w.EmployeeID = e1.EmployeeID
  INNER JOIN
  tb_employee AS e2 ON w.EmployeeID_AssignTo = e2.EmployeeID
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.status(200).json(results);
  });
};

// Inserting assignment with auto generated id from backend

exports.addAssignmentWithId = (req, res) => {
  const newAssignment = req.body;

  newAssignment.AssignmentStatus = newAssignment.AssignmentStatus || "Pending";
  newAssignment.Type = newAssignment.Type || "A";

  const query =
    "SELECT MAX(SUBSTRING(AssignmentID, 3)) AS maxID FROM tb_assignment";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error getting max AssignmentID: ", err);
      res.status(500).json({ error: "Internal server error" });
      return;
    }

    let nextID = 1;

    if (results && results[0].maxID !== null) {
      nextID = parseInt(results[0].maxID, 10) + 1;
    }

    const formattedID = `AS${nextID.toString().padStart(3, "0")}`;

    newAssignment.AssignmentID = formattedID;

    const query = "INSERT INTO tb_assignment SET ?";
    db.query(query, newAssignment, (err, results) => {
      if (err) {
        console.error("Error executing query:", err);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        res.status(200).json({ message: "Assignment added successfully" });
      }
    });
  });
};

// updating assignment's data

exports.updateAssignment = (req, res) => {
  const assignmentId = req.params.AssignmentID;
  const updatedAssignment = req.body;
  const query = "UPDATE tb_assignment SET ? WHERE AssignmentID = ?";

  db.query(query, [updatedAssignment, assignmentId], (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      if (results.affectedRows === 0) {
        res.status(404).json({ error: "Assignment not found" });
        return;
      } else if (results.affectedRows > 0 && results.changedRows === 0) {
        res.status(200).json("Assignment's data is up to date already");
        return;
      } else {
        res.status(200).json({ message: "Assignment updated successfully" });
      }
    }
  });
};

// updating assignment status from pending to progress

exports.progressAssignmentStatus = (req, res) => {
  const assignmentId = req.params.AssignmentID;
  const query =
    "UPDATE tb_assignment SET AssignmentStatus = 'Progress' WHERE AssignmentID = ? AND AssignmentStatus = 'Pending';";
  db.query(query, [assignmentId], (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      if (results.affectedRows === 0) {
        res.status(404).json({ error: "Assignment not found" });
        return;
      } else if (results.affectedRows > 0 && results.changedRows === 0) {
        res.status(200).json("Assignment Status is up to date already");
        return;
      } else {
        res
          .status(200)
          .json({ message: "Assignment Status updated successfully" });
      }
    }
  });
};

// updating assignment status from progress to completed

exports.completedAssignmentStatus = (req, res) => {
  const assignmentId = req.params.AssignmentID;
  const query =
    "UPDATE tb_assignment SET AssignmentStatus = 'Completed' WHERE AssignmentID = ? AND AssignmentStatus = 'Progress';";
  db.query(query, [assignmentId], (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      if (results.affectedRows === 0) {
        res.status(404).json({ error: "Assignment not found" });
        return;
      } else if (results.affectedRows > 0 && results.changedRows === 0) {
        res.status(200).json("Assignment Status is up to date already");
        return;
      } else {
        res
          .status(200)
          .json({ message: "Assignment Status updated successfully" });
      }
    }
  });
};

// number of pending progress and completed assignments of a particular employee

exports.numberOfAssignmentsByStatus = (req, res) => {
  const employeeId = req.params.EmployeeID_AssignTo;
  const query = `
    SELECT
      COUNT(CASE WHEN AssignmentStatus = 'Pending' THEN 1 END) AS num_pending_assignments,
      COUNT(CASE WHEN AssignmentStatus = 'Progress' THEN 1 END) AS num_progress_assignments,
      COUNT(CASE WHEN AssignmentStatus = 'Completed' THEN 1 END) AS num_completed_assignments
    FROM tb_assignment
    WHERE EmployeeID_AssignTo = ?;
  `;

  db.query(query, employeeId, (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      const assignmentCounts = {
        pending_assignments: results[0].num_pending_assignments,
        progress_assignments: results[0].num_progress_assignments,
        complete_assignments: results[0].num_completed_assignments,
      };

      res.status(200).json(assignmentCounts);
    }
  });
};

// Deleting Assignment's data

exports.deleteAssignment = (req, res) => {
  const assignmentId = req.params.AssignmentID;
  const query = "DELETE FROM tb_assignment WHERE AssignmentID = ?";
  db.query(query, [assignmentId], (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      if (results.affectedRows === 0) {
        res.status(404).json({ error: "Assignment not found" });
        return;
      } else {
        res.status(200).json({ message: "Assignment deleted successfully" });
      }
    }
  });
};

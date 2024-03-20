const { queryAsync } = require("../db");

// Get All Assignments

exports.getAllAssignments = async (req, res) => {
  try {
    const query = "SELECT * FROM tb_assignment_old";
    const results = await queryAsync(query);
    res.status(200).json(results);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get Assignment By ID

exports.getAssignmentById = async (req, res) => {
  const assignmentId = req.params.AssignmentID;
  try {
    const query = "SELECT * FROM tb_assignment_old WHERE AssignmentID = ?";
    const results = await queryAsync(query, [assignmentId]);
    res.status(200).json(results);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get Assignment with Employees Data

exports.getAssignmentEmployeesData = async (req, res) => {
  try {
    const query = `
      SELECT 
        w.*, 
        e1.FirstName AS Assigner_FirstName, 
        e1.LastName AS Assigner_LastName,
        e2.FirstName AS Assignee_FirstName,
        e2.LastName AS Assignee_LastName
      FROM 
        tb_assignment_old AS w
        INNER JOIN 
        tb_employee AS e1 ON w.EmployeeID = e1.EmployeeID
        INNER JOIN
        tb_employee AS e2 ON w.EmployeeID_AssignTo = e2.EmployeeID
    `;
    const results = await queryAsync(query);
    res.status(200).json(results);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// add assignment

exports.addAssignment = async (req, res) => {
  const newAssignment = req.body;
  newAssignment.AssignmentStatus = newAssignment.AssignmentStatus || "Assigned";
  newAssignment.Type = newAssignment.Type || "A";

  try {
    const maxIDQuery =
      "SELECT MAX(SUBSTRING(AssignmentID,3)) AS maxID FROM tb_assignment_old";
    const results = await queryAsync(maxIDQuery);
    let nextID = 1;
    if (results && results[0].maxID !== null) {
      nextID = parseInt(results[0].maxID, 10) + 1;
    }
    const formattedID = `AS${nextID.toString().padStart(3, "0")}`;
    newAssignment.AssignmentID = formattedID;
    const insertQuery = "INSERT INTO tb_assignment_old SET ?";
    await queryAsync(insertQuery, newAssignment);
    res.status(201).json({ message: "Assignment added successfully" });
  } catch (error) {
    console.error("Error executing query :", error);
    res.status(500).json({ Error: "Internal server error" });
  }
};

// Update Assignment

exports.updateAssignment = async (req, res) => {
  const assignmentId = req.params.AssignmentID;
  const updatedAssignment = req.body;
  const updateQuery = "UPDATE tb_assignment_old SET ? WHERE AssignmentID = ?";

  try {
    const results = await queryAsync(updateQuery, [
      updatedAssignment,
      assignmentId,
    ]);

    if (results.affectedRows === 0) {
      res.status(404).json({ error: "Assignment not found" });
    } else if (results.affectedRows > 0 && results.changedRows === 0) {
      res.status(200).json("Assignment's data is up to date already");
    } else {
      res.status(200).json({ message: "Assignment updated successfully" });
    }
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// update Assignment Status To Reject

exports.updateAssignmentStatusToReject = async (req, res) => {
  const assignmentId = req.params.AssignmentID;
  const { Feedback } = req.body; 
  const rejectTimestamp = new Date();
  
  if (!Feedback) {
      return res.status(400).json({ error: "Feedback is required" });
    }

  const updateQuery = `
      UPDATE tb_assignment_old 
      SET AssignmentStatus = 'Reject', 
          Feedback = ?,
          RejectTimestamp = ? 
      WHERE AssignmentID = ? 
      AND 
      AssignmentStatus = 'Assigned';
  `;

  try {
    const results = await queryAsync(updateQuery, [
      Feedback,
      rejectTimestamp,
      assignmentId,
    ]);

    if (results.affectedRows === 0) {
      res.status(404).json({ error: "Assignment not found" });
    } else if (results.affectedRows > 0 && results.changedRows === 0) {
      res.status(200).json({ message: "Assignment is up to date already" });
    } else {
      res
        .status(200)
        .json({ message: "Assignment status updated successfully" });
    }
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// update Assignment Status To Progress

exports.updateAssignmentStatusToProgress = async (req, res) => {
  const assignmentId = req.params.AssignmentID;
  const acceptTimestamp = new Date();

  const updateQuery = `
      UPDATE tb_assignment_old 
      SET AssignmentStatus = 'Progress',
          AcceptTimestamp = ? 
      WHERE AssignmentID = ? 
          AND AssignmentStatus = 'Assigned';`;

  try {
    const results = await queryAsync(updateQuery, [
      acceptTimestamp,
      assignmentId,
    ]);

    if (results.affectedRows === 0) {
      res.status(404).json({ error: "Assignment not found" });
    } else if (results.affectedRows > 0 && results.changedRows === 0) {
      res.status(200).json({ message: "Assignment is up to date already" });
    } else {
      res
        .status(200)
        .json({ message: "Assignment status updated successfully" });
    }
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// update Assignment Status To Regret

exports.updateAssignmentStatusToRegret = async (req, res) => {
  const assignmentId = req.params.AssignmentID;
  const { Feedback } = req.body; 
  const regretTimestamp = new Date();
  
  if (!Feedback) {
      return res.status(400).json({ error: "Feedback is required" });
    }

  const updateQuery = `
      UPDATE tb_assignment_old 
      SET AssignmentStatus = 'Regret', 
          Feedback = ?,
          RegretTimestamp = ? 
      WHERE AssignmentID = ? 
      AND 
      AssignmentStatus = 'Progress';
  `;

  try {
    const results = await queryAsync(updateQuery, [
      Feedback,
      regretTimestamp,
      assignmentId,
    ]);

    if (results.affectedRows === 0) {
      res.status(404).json({ error: "Assignment not found" });
    } else if (results.affectedRows > 0 && results.changedRows === 0) {
      res.status(200).json({ message: "Assignment is up to date already" });
    } else {
      res
        .status(200)
        .json({ message: "Assignment status updated successfully" });
    }
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// update Assignment Status To Completed

exports.updateAssignmentStatusToCompleted = async (req, res) => {
  const assignmentId = req.params.AssignmentID;
  const completionTimestamp = new Date();

  const updateQuery = `
      UPDATE tb_assignment_old 
      SET AssignmentStatus = 'Completed',
          CompletionTimestamp = ? 
      WHERE AssignmentID = ? 
          AND AssignmentStatus = 'Progress';`;

  try {
    const results = await queryAsync(updateQuery, [
      completionTimestamp,
      assignmentId,
    ]);

    if (results.affectedRows === 0) {
      res.status(404).json({ error: "Assignment not found" });
    } else if (results.affectedRows > 0 && results.changedRows === 0) {
      res.status(200).json({ message: "Assignment is up to date already" });
    } else {
      res
        .status(200)
        .json({ message: "Assignment status updated successfully" });
    }
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Number of Assignments By Status

exports.numberOfAssignmentsByStatus = async (req, res) => {
  try {
    const employeeId = req.params.EmployeeID_AssignTo;
    if (!employeeId) {
      return res.status(400).json({ error: "EmployeeID_AssignTo parameter is required." });
    }

    const query = `
      SELECT
        SUM(CASE WHEN AssignmentStatus = 'Assigned' THEN 1 ELSE 0 END) AS num_pending_assignments,
        SUM(CASE WHEN AssignmentStatus = 'Reject' THEN 1 ELSE 0 END) AS num_reject_assignments,
        SUM(CASE WHEN AssignmentStatus = 'Progress' THEN 1 ELSE 0 END) AS num_progress_assignments,
        SUM(CASE WHEN AssignmentStatus = 'Regret' THEN 1 ELSE 0 END) AS num_regret_assignments,
        SUM(CASE WHEN AssignmentStatus = 'Completed' THEN 1 ELSE 0 END) AS num_completed_assignments
      FROM tb_assignment_old
      WHERE EmployeeID_AssignTo = ?;
    `;

    const results = await queryAsync(query, [employeeId]);

    const assignmentCounts = {
      Assigned_assignments: results[0].num_pending_assignments,
      Rejected_assignments: results[0].num_reject_assignments,
      Progress_assignments: results[0].num_progress_assignments,
      Regret_assignments: results[0].num_regret_assignments,
      Completed_assignments: results[0].num_completed_assignments,
    };

    res.status(200).json(assignmentCounts);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete Assignment

exports.deleteAssignment = async (req, res) => {
  const assignmentId = req.params.AssignmentID;
  const deleteQuery = "DELETE FROM tb_assignment_old WHERE AssignmentID = ?";

  try {
    const results = await queryAsync(deleteQuery, [assignmentId]);

    if (results.affectedRows === 0) {
      res.status(404).json({ error: "Assignment not found" });
    } else {
      res.status(200).json({ message: "Assignment deleted successfully" });
    }
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const { queryAsync } = require("../db");

// Get All Assignments

exports.getAllAssignments = async (req, res) => {
  try {
    const query = "SELECT * FROM tb_assignment_test";
    const results = await queryAsync(query);
    res.status(200).json(results);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get Assignment By ID

exports.getAssignmentById = async (req, res) => {
  const { AssignmentID, EmployeeID, EmployeeID_AssignTo } = req.params;
  try {
    const query = `
            SELECT * 
            FROM tb_assignment 
            WHERE 
                AssignmentID = ? 
                AND EmployeeID = ? 
                AND EmployeeID_AssignTo = ?;`;
    const results = await queryAsync(query, [
      AssignmentID,
      EmployeeID,
      EmployeeID_AssignTo,
    ]);
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
  newAssignment.Course = newAssignment.Course || 1;

  try {
    const maxIDQuery =
      "SELECT MAX(SUBSTRING(AssignmentID,3)) AS maxID FROM tb_assignment_test";
    const results = await queryAsync(maxIDQuery);
    let nextID = 1;
    if (results && results[0].maxID !== null) {
      nextID = parseInt(results[0].maxID, 10) + 1;
    }
    const formattedID = `AS${nextID.toString().padStart(3, "0")}`;
    newAssignment.AssignmentID = formattedID;
    const insertQuery = "INSERT INTO tb_assignment_test SET ?";
    await queryAsync(insertQuery, newAssignment);
    res.status(201).json({ message: "Assignment added successfully" });
  } catch (error) {
    console.error("Error executing query :", error);
    res.status(500).json({ Error: "Internal server error" });
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
          tb_assignment_test AS w
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

// reassign an assignment

exports.reassignAssignment = async (req, res) => {
  const { AssignmentID, EmployeeID, EmployeeID_AssignTo } = req.params;
  try {
    const query = `
        SELECT * 
        FROM tb_assignment_test 
        WHERE 
            AssignmentID = ? 
            AND EmployeeID = ? 
            AND EmployeeID_AssignTo = ?;
      `;
    const results = await queryAsync(query, [
      AssignmentID,
      EmployeeID,
      EmployeeID_AssignTo,
    ]);

    if (results.length === 0) {
      return res.status(404).json({ error: "Assignment not found" });
    }
    const originalAssignment = results;

    // Check if the assignment status is Reject or Regret
    if (
      originalAssignment.AssignmentStatus === "Reject" ||
      originalAssignment.AssignmentStatus === "Regret"
    ) {
      // Create a new assignment entry for the reassigned task
      const reassignData = {
        AssignmentID: originalAssignment.AssignmentID,
        EmployeeID: originalAssignment.EmployeeID,
        EmployeeID_AssignTo: req.body.EmployeeID_AssignTo,
        Assignment_Description: originalAssignment.Assignment_Description,
        AssignDate: originalAssignment.AssignDate,
        DeadlineDate: originalAssignment.DeadlineDate || req.body.DeadlineDate,
        AcceptTimestamp: null,
        RejectTimeStamp: null,
        RegretTimeStamp: null,
        CompletionTimestamp: null,
        AssignmentStatus: "Assigned",
        AssignmentPriority:
          originalAssignment.AssignmentPriority || req.body.AssignmentPriority,
        Type: originalAssignment.Type,
        Feedback: null,
        Course: originalAssignment.Course + 1,
        ReassignDate: new Date(),
      };

      // Insert the new assignment entry
      await queryAsync("INSERT INTO tb_assignment_test SET ?", reassignData);
      res.status(200).json({ message: "Assignment reassigned successfully" });
    } else {
      res
        .status(400)
        .json({ error: "Assignment status is not Rejected or Regretted" });
    }
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update Assignment

exports.updateAssignment = async (req, res) => {
  const { AssignmentID, EmployeeID, EmployeeID_AssignTo } = req.params;
  const updatedAssignment = req.body;
  const updateQuery = `
        UPDATE tb_assignment_test
        SET ? 
        WHERE 
            AssignmentID = ? 
            AND EmployeeID = ? 
            AND EmployeeID_AssignTo = ?;`;

  try {
    const results = await queryAsync(updateQuery, [
      updatedAssignment,
      AssignmentID,
      EmployeeID,
      EmployeeID_AssignTo,
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
  const { AssignmentID, EmployeeID, EmployeeID_AssignTo } = req.params;
  const { Feedback } = req.body;
  const rejectTimestamp = new Date();

  if (!Feedback) {
    return res.status(400).json({ error: "Feedback is required" });
  }

  const updateQuery = `
        UPDATE tb_assignment_test
        SET
            AssignmentStatus = 'Reject',
            Feedback = ?,
            RejectTimestamp = ?
        WHERE
            AssignmentID = ? 
            AND EmployeeID = ? 
            AND EmployeeID_AssignTo = ? 
            AND AssignmentStatus = 'Assigned';
    `;

  try {
    const results = await queryAsync(updateQuery, [
      Feedback,
      rejectTimestamp,
      AssignmentID,
      EmployeeID,
      EmployeeID_AssignTo,
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
  const { AssignmentID, EmployeeID, EmployeeID_AssignTo } = req.params;
  const acceptTimestamp = new Date();

  const updateQuery = `
        UPDATE tb_assignment_test 
        SET 
            AssignmentStatus = 'Progress',
            AcceptTimestamp = ? 
        WHERE
            AssignmentID = ? 
            AND EmployeeID = ? 
            AND EmployeeID_AssignTo = ? 
            AND AssignmentStatus = 'Assigned';`;

  try {
    const results = await queryAsync(updateQuery, [
      acceptTimestamp,
      AssignmentID,
      EmployeeID,
      EmployeeID_AssignTo,
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
  const { AssignmentID, EmployeeID, EmployeeID_AssignTo } = req.params;
  const { Feedback } = req.body;
  const regretTimestamp = new Date();

  if (!Feedback) {
    return res.status(400).json({ error: "Feedback is required" });
  }

  const updateQuery = `
        UPDATE tb_assignment_test 
        SET 
            AssignmentStatus = 'Regret', 
            Feedback = ?,
            RegretTimestamp = ? 
        WHERE
            AssignmentID = ? 
            AND EmployeeID = ? 
            AND EmployeeID_AssignTo = ?  
            AND AssignmentStatus = 'Progress';
    `;

  try {
    const results = await queryAsync(updateQuery, [
      Feedback,
      regretTimestamp,
      AssignmentID,
      EmployeeID,
      EmployeeID_AssignTo,
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
  const { AssignmentID, EmployeeID, EmployeeID_AssignTo } = req.params;
  const completionTimestamp = new Date();

  const updateQuery = `
        UPDATE tb_assignment_test 
        SET 
            AssignmentStatus = 'Completed',
            CompletionTimestamp = ? 
        WHERE
            AssignmentID = ? 
            AND EmployeeID = ? 
            AND EmployeeID_AssignTo = ?  
            AND AssignmentStatus = 'Progress';`;

  try {
    const results = await queryAsync(updateQuery, [
      completionTimestamp,
      AssignmentID,
      EmployeeID,
      EmployeeID_AssignTo,
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
      return res
        .status(400)
        .json({ error: "EmployeeID_AssignTo parameter is required." });
    }

    const query = `
        SELECT
          SUM(CASE WHEN AssignmentStatus = 'Assigned' THEN 1 ELSE 0 END) AS num_pending_assignments,
          SUM(CASE WHEN AssignmentStatus = 'Reject' THEN 1 ELSE 0 END) AS num_reject_assignments,
          SUM(CASE WHEN AssignmentStatus = 'Progress' THEN 1 ELSE 0 END) AS num_progress_assignments,
          SUM(CASE WHEN AssignmentStatus = 'Regret' THEN 1 ELSE 0 END) AS num_regret_assignments,
          SUM(CASE WHEN AssignmentStatus = 'Completed' THEN 1 ELSE 0 END) AS num_completed_assignments
        FROM tb_assignment_test
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
  const { AssignmentID, EmployeeID, EmployeeID_AssignTo } = req.params;
  const deleteQuery = `
        DELETE FROM 
            tb_assignment_test 
        WHERE 
            AssignmentID = ? 
            AND EmployeeID = ? 
            AND EmployeeID_AssignTo = ? ;`;

  try {
    const results = await queryAsync(deleteQuery, [
      AssignmentID,
      EmployeeID,
      EmployeeID_AssignTo,
    ]);

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

const { queryAsync } = require("../db");


// Get All Assignments

exports.getAllAssignments = async (req, res) => {
  try {
    const query = "SELECT * FROM tb_assignment";
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
    const query = "SELECT * FROM tb_assignment WHERE AssignmentID = ?";
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
        tb_assignment AS w
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

// Add Assignment With ID

// exports.addAssignmentWithId = async (req, res) => {
//   const newAssignment = req.body;
//   newAssignment.AssignmentStatus = newAssignment.AssignmentStatus || "Pending";
//   newAssignment.Type = newAssignment.Type || "A";

//   try {
//     const maxIDQuery =
//       "SELECT MAX(SUBSTRING(AssignmentID, 3)) AS maxID FROM tb_assignment";
//     const results = await queryAsync(maxIDQuery);

//     let nextID = 1;

//     if (results && results[0].maxID !== null) {
//       nextID = parseInt(results[0].maxID, 10) + 1;
//     }

//     const formattedID = `AS${nextID.toString().padStart(3, "0")}`;
//     newAssignment.AssignmentID = formattedID;

//     const insertQuery = "INSERT INTO tb_assignment SET ?";
//     await queryAsync(insertQuery, newAssignment);

//     res.status(201).json({ message: "Assignment added successfully" });
//   } catch (error) {
//     console.error("Error executing query:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// add assignment

exports.addAssignment = async (req, res) => {
  const newAssignment = req.body;
  newAssignment.AssignmentStatus = newAssignment.AssignmentStatus || "Assigned";
  newAssignment.Type = newAssignment.Type || "A";

  try {
    const maxIDQuery =
      "SELECT MAX(SUBSTRING(AssignmentID,3)) AS maxID FROM tb_assignment";
    const results = await queryAsync(maxIDQuery);
    let nextID = 1;
    if (results && results[0].maxID !== null) {
      nextID = parseInt(results[0].maxID, 10) + 1;
    }
    const formattedID = `AS${nextID.toString().padStart(3, "0")}`;
    newAssignment.AssignmentID = formattedID;
    const insertQuery = "INSERT INTO tb_assignment SET ?";
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
  const updateQuery = "UPDATE tb_assignment SET ? WHERE AssignmentID = ?";

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

// Progress Assignment Status

// exports.progressAssignmentStatus = async (req, res) => {
//   const assignmentId = req.params.AssignmentID;
//   const query =
//     "UPDATE tb_assignment SET AssignmentStatus = 'Progress' WHERE AssignmentID = ? AND AssignmentStatus = 'Pending';";

//   try {
//     const results = await queryAsync(query, [assignmentId]);

//     if (results.affectedRows === 0) {
//       res.status(404).json({ error: "Assignment not found" });
//     } else if (results.affectedRows > 0 && results.changedRows === 0) {
//       res.status(200).json("Assignment Status is up to date already");
//     } else {
//       res
//         .status(200)
//         .json({ message: "Assignment Status updated successfully" });
//     }
//   } catch (error) {
//     console.error("Error executing query:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// update Assignment Status To Progress

exports.updateAssignmentStatusToProgress = async (req, res) => {
  const assignmentId = req.params.AssignmentID;
  const acceptTimestamp = new Date();

  const updateQuery = `UPDATE tb_assignment SET AssignmentStatus = 'Progress', AcceptTimestamp = ? WHERE AssignmentID = ? AND AssignmentStatus = 'Assigned';`;

  try {
    const results = await queryAsync(updateQuery, [acceptTimestamp, assignmentId]);

    if (results.affectedRows === 0) {
      res.status(404).json({ error: "Assignment not found" });
    } else if (results.affectedRows > 0 && results.changedRows === 0) {
      res.status(200).json({ message: "Assignment is up to date already" });
    } else {
      res.status(200).json({ message: "Assignment status updated successfully" });
    }
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Completed Assignment Status

exports.completedAssignmentStatus = async (req, res) => {
  const assignmentId = req.params.AssignmentID;
  const query =
    "UPDATE tb_assignment SET AssignmentStatus = 'Completed' WHERE AssignmentID = ? AND AssignmentStatus = 'Progress';";

  try {
    const results = await queryAsync(query, [assignmentId]);

    if (results.affectedRows === 0) {
      res.status(404).json({ error: "Assignment not found" });
    } else if (results.affectedRows > 0 && results.changedRows === 0) {
      res.status(200).json("Assignment Status is up to date already");
    } else {
      res
        .status(200)
        .json({ message: "Assignment Status updated successfully" });
    }
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Number of Assignments By Status

exports.numberOfAssignmentsByStatus = async (req, res) => {
  const employeeId = req.params.EmployeeID_AssignTo;
  const query = `
    SELECT
      COUNT(CASE WHEN AssignmentStatus = 'Pending' THEN 1 END) AS num_pending_assignments,
      COUNT(CASE WHEN AssignmentStatus = 'Progress' THEN 1 END) AS num_progress_assignments,
      COUNT(CASE WHEN AssignmentStatus = 'Completed' THEN 1 END) AS num_completed_assignments
    FROM tb_assignment
    WHERE EmployeeID_AssignTo = ?;
  `;

  try {
    const results = await queryAsync(query, [employeeId]);
    const assignmentCounts = {
      pending_assignments: results[0].num_pending_assignments,
      progress_assignments: results[0].num_progress_assignments,
      complete_assignments: results[0].num_completed_assignments,
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
  const deleteQuery = "DELETE FROM tb_assignment WHERE AssignmentID = ?";

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

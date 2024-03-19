const {queryAsync} = require("../db")

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

// add assignment

exports.addAssignment = async (req, res) => {
    const newAssignment = req.body;
    newAssignment.AssignmentStatus = newAssignment.AssignmentStatus || "Assigned";
    newAssignment.Type = newAssignment.Type || "A";
    newAssignment.Course = newAssignment.Course || 1 ;
  
    try {
      const maxIDQuery =
        "SELECT MAX(SUBSTRING(AssignmentID,3)) AS maxID FROM tb_assignment_test";
      const results = await queryAsync(maxIDQuery);
      console.log(results);
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

// reassign an assignment 

exports.reassignAssignment = async (req, res) => {
    const { assignmentID, employeeID, employeeIDAssignTo } = req.params;
  
    try {
      // Fetch the original assignment data
      const [results] = await queryAsync('SELECT * FROM tb_assignment_test WHERE AssignmentID = ? AND EmployeeID = ? AND EmployeeID_AssignTo = ?', [assignmentID, employeeID, employeeIDAssignTo]);
  
      if (results.length === 0) {
        return res.status(404).json({ error: 'Assignment not found' });
      }
  
      const originalAssignment = results[0];
  
      // Check if the assignment status is Reject or Regret
      if (originalAssignment.AssignmentStatus === 'Reject' || originalAssignment.AssignmentStatus === 'Regret') {
        // Create a new assignment entry for the reassigned task
        const reassignData = {
          AssignmentID: originalAssignment.AssignmentID,
          EmployeeID: originalAssignment.EmployeeID,
          EmployeeID_AssignTo: req.body.newEmployeeID, // Use the new employee ID
          Assignment_Description: originalAssignment.Assignment_Description,
          AssignDate: originalAssignment.AssignDate,
          DeadlineDate: null,
          AcceptTimestamp: null,
          CancelTimestamp: null,
          CompletionTimestamp: null,
          AssignmentStatus: 'Assigned',
          AssignmentPriority: originalAssignment.AssignmentPriority,
          Type: originalAssignment.Type,
          Feedback: originalAssignment.Feedback,
          Course: originalAssignment.Course + 1,
          ReassignDate: new Date()
        };
  
        // Insert the new assignment entry
        await queryAsync('INSERT INTO tb_assignment_test SET ?', reassignData);
        res.status(200).json({ message: 'Assignment reassigned successfully' });
      } else {
        res.status(400).json({ error: 'Assignment status is not Reject or Regret' });
      }
    } catch (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
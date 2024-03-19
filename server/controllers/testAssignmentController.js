const {queryAsync} = require("../db")

// add assignment

exports.addAssignment = async (req, res) => {
    const newAssignment = req.body;
    newAssignment.AssignmentStatus = newAssignment.AssignmentStatus || "Assigned";
    newAssignment.Type = newAssignment.Type || "A";
  
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
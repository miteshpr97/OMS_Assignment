const { queryAsync } = require("../db");

// Add complaint with id

exports.addComplaint = async (req, res) => {
  const newComplaint = req.body;
  try {
    const maxIDQuery = `SELECT MAX(SUBSTRING(ComplaintID,2)) AS maxID FROM tb_complaints`;
    const results = await queryAsync(maxIDQuery);

    let nextID = 1;
    if (results && results[0].maxID !== null) {
      nextID = parseInt(results[0].maxID, 10) + 1;
    }
    const formattedID = `C${nextID.toString().padStart(3, "0")}`;

    newComplaint.ComplaintID = formattedID;

    const insertQuery = `INSERT INTO tb_complaints SET ?`;
    await queryAsync(insertQuery, newComplaint);
    res.status(201).json({ message: "Complaint added successfully" });
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get all complaints

exports.getAllComplaints = async (req, res) => {
  try {
    const query = `SELECT * FROM tb_complaints`;
    const results = await queryAsync(query);
    res.status(200).json(results);
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update Complaint

exports.updateComplaint = async (req, res) => {
  const complaintId = req.params.ComplaintID;
  const updatedComplaint = req.body;
  const updateQuery = "UPDATE tb_complaints SET ? WHERE ComplaintID = ?";

  try {
    const results = await queryAsync(updateQuery, [
      updatedComplaint,
      complaintId,
    ]);

    if (results.affectedRows === 0) {
      res.status(404).json({ error: "Complaint not found" });
    } else if (results.affectedRows > 0 && results.changedRows === 0) {
      res.status(200).json("Complaint's data is up to date already");
    } else {
      res.status(200).json({ message: "Complaint updated successfully" });
    }
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete Complaint

exports.deleteComplaint = async (req, res) => {
  const complaintId = req.params.ComplaintID;
  const deleteQuery = "DELETE FROM tb_complaints WHERE ComplaintID = ?";

  try {
    const results = await queryAsync(deleteQuery, [complaintId]);

    if (results.affectedRows === 0) {
      res.status(404).json({ error: "Complaint not found" });
    } else {
      res
        .status(200)
        .json({ message: "Complaint's data deleted successfully" });
    }
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

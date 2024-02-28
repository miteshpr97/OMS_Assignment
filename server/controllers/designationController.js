const { queryAsync } = require("../db");

// Get All Designations

exports.getAllDesignations = async (req, res) => {
  try {
    const query = "SELECT * FROM tb_designation";
    const results = await queryAsync(query);
    res.status(200).json(results);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get Designation By ID

exports.getDesignationById = async (req, res) => {
  const designationId = req.params.DesignationID;
  try {
    const query = "SELECT * FROM tb_designation WHERE DesignationID = ?";
    const results = await queryAsync(query, [designationId]);
    res.status(200).json(results);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Add Designation With ID

exports.addDesignationWithId = async (req, res) => {
  const newDesignation = req.body;

  try {
    const maxIDQuery =
      "SELECT MAX(SUBSTRING(DesignationID, 6)) AS maxID FROM tb_designation";
    const results = await queryAsync(maxIDQuery);

    let nextID = 1;

    if (results && results[0].maxID !== null) {
      nextID = parseInt(results[0].maxID, 10) + 1;
    }

    const formattedID = `DESIG${nextID.toString().padStart(3, "0")}`;
    newDesignation.DesignationID = formattedID;

    const insertQuery = "INSERT INTO tb_designation SET ?";
    await queryAsync(insertQuery, newDesignation);

    res.status(200).json({ message: "Designation added successfully" });
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update Designation

exports.updateDesignation = async (req, res) => {
  const designationId = req.params.DesignationID;
  const updatedDesignation = req.body;
  const updateQuery = "UPDATE tb_designation SET ? WHERE DesignationID = ?";

  try {
    const results = await queryAsync(updateQuery, [
      updatedDesignation,
      designationId,
    ]);

    if (results.affectedRows === 0) {
      res.status(404).json({ error: "Designation not found" });
    } else if (results.affectedRows > 0 && results.changedRows === 0) {
      res.status(200).json("Designation's data is up to date already");
    } else {
      res.status(200).json({ message: "Designation updated successfully" });
    }
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete Designation

exports.deleteDesignation = async (req, res) => {
  const designationId = req.params.DesignationID;
  const deleteQuery = "DELETE FROM tb_designation WHERE DesignationID = ?";

  try {
    const results = await queryAsync(deleteQuery, [designationId]);

    if (results.affectedRows === 0) {
      res.status(404).json({ error: "Designation not found" });
    } else {
      res
        .status(200)
        .json({ message: "Designation's data deleted successfully" });
    }
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
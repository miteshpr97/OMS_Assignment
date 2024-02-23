const db = require("../db");


// Getting all designations

exports.getAllDesignations = (req, res) => {
  const query = "SELECT * FROM tb_designation";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.status(200).json(results);
    }
  });
};


// Inserting designation

exports.addDesignation = (req, res) => {
  const newDesignation = req.body;

  const query = "INSERT INTO tb_designation SET ?";
  db.query(query, newDesignation, (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.status(200).json({ message: "Designation added successfully" });
    }
  });
};


// getting latest or last designation id

exports.getLastDesignationId = (req, res) => {
  const query = "SELECT MAX(DesignationID) AS maxID FROM tb_designation ";

  db.query(query, (error, results) => {
    if (error) {
      console.error("Error executing query:", error);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    if (results[0].maxID === null) {
      const DesignationId = (results[0].maxID = "DESIG000");
      res.status(200).json({ lastDesignationId: DesignationId });
      return;
    }
    const lastDesignationId = results[0].maxID;
    res.status(200).json({ lastDesignationId: lastDesignationId });
  });
};


// getting next designation id 

exports.getNextDesignationId = (req, res) => {
  const query = "SELECT MAX(DesignationID) AS maxID FROM tb_designation ";

  db.query(query, (error, results) => {
    if (error) {
      console.error("Error executing query:", error);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }

    let nextDesignationId;
    if (results.length === 0 || results[0].maxID === null) {
      nextDesignationId = "DESIG001";
    } else {
      const lastDesignationId = results[0].maxID;
      const numericPart = parseInt(lastDesignationId.substr(5), 10) + 1;
      nextDesignationId = "DESIG" + numericPart.toString().padStart(3, '0');
    }

    res.status(200).json({ nextDesignationId: nextDesignationId });
  });
};


// updating designation's data

exports.updateDesignation = (req, res) => {
  const designationId = req.params.DesignationID;
  const updatedDesignation = req.body;
  const query = "UPDATE tb_designation SET ? WHERE DesignationID = ?";

  db.query(query, [updatedDesignation, designationId], (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      if (results.affectedRows === 0) {
        res.status(404).json({ error: "Designation not found" });
        return;
      } else if (results.affectedRows > 0 && results.changedRows === 0) {
        res.status(200).json("Designation's data is up to date already");
        return;
      } else {
        res.status(200).json({ message: "Designation updated successfully" });
      }
    }
  });
};


// Deleting designation's data

exports.deleteDesignation = (req, res) => {
  const designationId = req.params.DesignationID;
  const query = "DELETE FROM tb_designation WHERE DesignationID = ?";
  db.query(query, [designationId], (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      if (results.affectedRows === 0) {
        res.status(404).json({ error: "Designation not found" });
        return;
      } else {
        res
          .status(200)
          .json({ message: "Designation's data deleted successfully" });
      }
    }
  });
};

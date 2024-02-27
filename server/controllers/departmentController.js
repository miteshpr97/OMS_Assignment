const db = require("../db");

// Getting all Department

exports.getAllDepartments = (req, res) => {
  const query = "SELECT * FROM tb_department";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.status(200).json(results);
    }
  });
};

// Getting particular department's data by their id

exports.getDepartmentById = (req, res) => {
  const departmentId = req.params.DepartmentID;
  const query = "SELECT * FROM tb_department WHERE DepartmentID = ?";
  db.query(query, departmentId, (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.status(200).json(results);
    }
  });
};

// Inserting Department

exports.addDepartment = (req, res) => {
  const newDepartment = req.body;

  const query = "INSERT INTO tb_department SET ?";
  db.query(query, newDepartment, (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.status(200).json({ message: "Department added successfully" });
    }
  });
};

// getting next department id

exports.getNextDepartmentId = (req, res) => {
  const query = "SELECT MAX(DepartmentID) AS maxID FROM tb_department ";

  db.query(query, (error, results) => {
    if (error) {
      console.error("Error executing query:", error);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }

    let nextDepartmentId;
    if (results.length === 0 || results[0].maxID === null) {
      nextDepartmentId = "DEPT001";
    } else {
      const lastDepartmentId = results[0].maxID;
      const numericPart = parseInt(lastDepartmentId.substr(4), 10) + 1;
      nextDepartmentId = "DEPT" + numericPart.toString().padStart(3, "0");
    }

    res.status(200).json({ nextDepartmentId: nextDepartmentId });
  });
};

// updating Department's data

exports.updateDepartment = (req, res) => {
  const departmentId = req.params.DepartmentID;
  const updatedDepartment = req.body;
  const query = "UPDATE tb_department SET ? WHERE DepartmentID = ?";

  db.query(query, [updatedDepartment, departmentId], (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      if (results.affectedRows === 0) {
        res.status(404).json({ error: "Department not found" });
        return;
      } else if (results.affectedRows > 0 && results.changedRows === 0) {
        res.status(200).json("Department's data is up to date already");
        return;
      } else {
        res.status(200).json({ message: "Department updated successfully" });
      }
    }
  });
};

// Deleting Department's data

exports.deleteDepartment = (req, res) => {
  const departmentId = req.params.DepartmentID;
  const query = "DELETE FROM tb_department WHERE DepartmentID = ?";
  db.query(query, [departmentId], (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      if (results.affectedRows === 0) {
        res.status(404).json({ error: "Department not found" });
        return;
      } else {
        res
          .status(200)
          .json({ message: "Department's data deleted successfully" });
      }
    }
  });
};

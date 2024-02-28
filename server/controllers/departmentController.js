const { queryAsync } = require("../db");

// Get All Departments

exports.getAllDepartments = async (req, res) => {
  try {
    const query = "SELECT * FROM tb_department";
    const results = await queryAsync(query);
    res.status(200).json(results);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get Department By ID

exports.getDepartmentById = async (req, res) => {
  const departmentId = req.params.DepartmentID;
  try {
    const query = "SELECT * FROM tb_department WHERE DepartmentID = ?";
    const results = await queryAsync(query, [departmentId]);
    res.status(200).json(results);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Add Department With ID

exports.addDepartmentWithId = async (req, res) => {
  const newDepartment = req.body;

  try {
    const maxIDQuery = "SELECT MAX(SUBSTRING(DepartmentID, 5)) AS maxID FROM tb_department";
    const results = await queryAsync(maxIDQuery);

    let nextID = 1;

    if (results && results[0].maxID !== null) {
      nextID = parseInt(results[0].maxID, 10) + 1;
    }

    const formattedID = `DEPT${nextID.toString().padStart(3, "0")}`;
    newDepartment.DepartmentID = formattedID;

    const insertQuery = "INSERT INTO tb_department SET ?";
    await queryAsync(insertQuery, newDepartment);

    res.status(200).json({ message: "Department added successfully" });
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update Department

exports.updateDepartment = async (req, res) => {
  const departmentId = req.params.DepartmentID;
  const updatedDepartment = req.body;
  const updateQuery = "UPDATE tb_department SET ? WHERE DepartmentID = ?";

  try {
    const results = await queryAsync(updateQuery, [updatedDepartment, departmentId]);

    if (results.affectedRows === 0) {
      res.status(404).json({ error: "Department not found" });
    } else if (results.affectedRows > 0 && results.changedRows === 0) {
      res.status(200).json("Department's data is up to date already");
    } else {
      res.status(200).json({ message: "Department updated successfully" });
    }
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete Department

exports.deleteDepartment = async (req, res) => {
  const departmentId = req.params.DepartmentID;
  const deleteQuery = "DELETE FROM tb_department WHERE DepartmentID = ?";

  try {
    const results = await queryAsync(deleteQuery, [departmentId]);

    if (results.affectedRows === 0) {
      res.status(404).json({ error: "Department not found" });
    } else {
      res.status(200).json({ message: "Department's data deleted successfully" });
    }
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
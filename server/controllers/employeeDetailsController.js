const { queryAsync } = require("../db");
const { uploadOnCloudinary } = require("../utils/cloudinary");

// send only those employees who don't have credentials 

exports.getEmployeeWithNoUserCredential = async (req, res) => {
  try {
    const query =`
    SELECT e.*
    FROM tb_employee e
    LEFT JOIN tb_userdetails u ON e.EmployeeID = u.EmployeeID
    WHERE u.EmployeeID IS NULL;`;

    const results = await queryAsync(query);
    res.status(200).json(results);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get All Employees

exports.getAllEmployees = async (req, res) => {
  try {
    const query = `
      SELECT 
        e.*, 
        d.DepartmentName, 
        d2.DesignationName
      FROM 
        tb_employee as e 
      INNER JOIN 
        tb_department as d ON e.DepartmentID = d.DepartmentID 
      INNER JOIN 
        tb_designation as d2 ON e.DesignationID = d2.DesignationID
      ORDER BY
        e.EmployeeID; `;
    const results = await queryAsync(query);
    res.status(200).json(results);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get All Data of Employees

exports.getAllDataOfEmployees = async (req, res) => {
  try {
    const query = `
    SELECT
        e.*, u.Role, u.Username, d.DepartmentName, d2.DesignationName
    FROM
        tb_employee as e
        INNER JOIN tb_userdetails as u ON e.EmployeeID = u.EmployeeID
        INNER JOIN tb_department as d ON e.DepartmentID = d.DepartmentID
        INNER JOIN tb_designation as d2 ON e.DesignationID = d2.DesignationID
    WHERE
        e.EmploymentStatus = 'Active'
    ORDER BY
        e.EmployeeID;`;
        
    const results = await queryAsync(query);
    const userEmployees = results.filter(
      (employee) => employee.Role === "User"
    );
    res.status(200).json(userEmployees);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get All Data of Employees by Employee ID

exports.getAllDataOfEmployeesByEmployeeId = async (req, res) => {
  const employeeId = req.params.EmployeeID;
  try {
    const query =
      "SELECT tb_employee.*, tb_userdetails.Role, tb_userdetails.Username FROM tb_employee INNER JOIN tb_userdetails ON tb_employee.EmployeeID = tb_userdetails.EmployeeID WHERE tb_employee.EmployeeID = ?";
    const results = await queryAsync(query, [employeeId]);
    res.status(200).json(results);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get Data of Employees with Their Department and Designation Name

exports.getDataOfEmployeesWithTheirDNames = async (req, res) => {
  try {
    const query = `
      SELECT
        e.EmployeeID,
        e.FirstName,
        e.LastName,
        e.EmploymentStatus,
        e.Employee_Profile,
        e.DepartmentID,
        d.DepartmentName,
        e.DesignationID,
        des.DesignationName
      FROM
        tb_employee e
      JOIN
        tb_department d ON e.DepartmentID = d.DepartmentID
      JOIN
        tb_designation des ON e.DesignationID = des.DesignationID
    `;
    const results = await queryAsync(query);
    res.status(200).json(results);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Add Employee

exports.addEmployee = async (req, res) => {
  const {
    FirstName,
    LastName,
    DateOfBirth,
    Gender,
    ContactNumber,
    Email,
    Address,
    JoinDate,
    EmploymentStatus,
    DepartmentID,
    DesignationID,
  } = req.body;
  const employeeProfilePath = req.file ? req.file.filename : null;

  try {
    const maxIDQuery =
      "SELECT MAX(SUBSTRING(EmployeeID, 4)) AS maxID FROM tb_employee";
    const results = await queryAsync(maxIDQuery);

    let nextID = 1;

    if (results && results[0].maxID !== null) {
      nextID = parseInt(results[0].maxID, 10) + 1;
    }

    const formattedID = `EMP${nextID.toString().padStart(3, "0")}`;
    const EmployeeID = formattedID;
    const employeeProfile = await uploadOnCloudinary(employeeProfilePath)

    const insertQuery = `INSERT INTO tb_employee 
      (EmployeeID, FirstName, LastName, DateOfBirth, Gender, ContactNumber, Email, Address, JoinDate, Employee_Profile, EmploymentStatus, DepartmentID, DesignationID)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    await queryAsync(insertQuery, [
      EmployeeID,
      FirstName,
      LastName,
      DateOfBirth,
      Gender,
      ContactNumber,
      Email,
      Address,
      JoinDate,
      employeeProfile,
      EmploymentStatus,
      DepartmentID,
      DesignationID,
    ]);

    res.status(201).json({ message: "Employee added successfully" });
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update Employee

exports.updateEmployee = async (req, res) => {
  const { EmployeeID } = req.params;
  const updatedEmployee = req.body;
  
  // Check if a file is included in the request
  if (req.file) {
    const employeeProfilePath = req.file.filename;
    updatedEmployee.Employee_Profile = await uploadOnCloudinary(employeeProfilePath);
  }

  const updateQuery = `
    UPDATE tb_employee 
    SET ? 
    WHERE EmployeeID = ?`;

  try {
    const results = await queryAsync(updateQuery, [updatedEmployee, EmployeeID]);

    if (results.affectedRows === 0) {
      res.status(404).json({ error: "Employee not found" });
    } else if (results.affectedRows > 0 && results.changedRows === 0) {
      res.status(200).json("Data is up to date already");
    } else {
      res.status(200).json({ message: "Employee updated successfully" });
    }
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete Employee

exports.deleteEmployee = async (req, res) => {
  const employeeId = req.params.EmployeeID;
  const deleteQuery = "DELETE FROM tb_employee WHERE EmployeeID = ?";

  try {
    const results = await queryAsync(deleteQuery, [employeeId]);

    if (results.affectedRows === 0) {
      res.status(404).json({ error: "Employee not found" });
    } else {
      res.status(200).json({ message: "Employee's data deleted successfully" });
    }
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const { queryAsync } = require("../db");

// Function to get the highest work group ID from the database

const getHighestWorkGroupID = async () => {
  const query =
    "SELECT MAX(CAST(SUBSTRING(WorkGroupID, 3) AS SIGNED)) AS maxID FROM tb_workGroup";
  try {
    const results = await queryAsync(query);
    const maxID = results[0].maxID || 0;
    return maxID;
  } catch (error) {
    throw error;
  }
};

// Function to generate workGroup IDs like WG001, WG002, ...

const generateWorkGroupID = (index) => {
  const paddedIndex = String(index).padStart(3, "0"); // Ensure three-digit padding
  return `WG${paddedIndex}`;
};

// Inserting multiple work group with auto generated workGroupID

exports.insertMultipleWorkGroup = async (req, res) => {
  const newWorkGroups = req.body;

  try {
    const maxID = await getHighestWorkGroupID();
    const query =
      "INSERT INTO tb_workGroup (WorkGroupID, EmployeeID_Assigner, EmployeeID_AssignTo, DepartmentID_AssignTo, CreatedDate, CreatedBy) VALUES ?";
    const values = newWorkGroups.map((workGroup, index) => [
      generateWorkGroupID(maxID + index + 1),
      workGroup.EmployeeID_Assigner,
      workGroup.EmployeeID_AssignTo,
      workGroup.DepartmentID_AssignTo,
      workGroup.CreatedDate,
      workGroup.CreatedBy,
    ]);

    await queryAsync(query, [values]);
    res.status(200).json({ message: "Work group inserted successfully" });
  } catch (error) {
    console.error("Error inserting work groups:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// get tasks of particular team

exports.getTasksOfParticularTeam = async (req, res) => {
  const EmployeeID = req.params.EmployeeID_Assigner;

  const query = `
    SELECT 
        w.*, t.*
    FROM
        tb_workGroup as w
        INNER JOIN tb_task as t ON w.EmployeeID_AssignTo = t.EmployeeID
        WHERE
        w.EmployeeID_Assigner = ? ;`;

  try {
    const results = await queryAsync(query,[EmployeeID]);
    res.status(200).json(results);
    console.log(results);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// get tasks of particular employee of particular team

// exports.getTasksOfParticularEmployee = async (req, res) => {
//   const { EmployeeID_Assigner, EmployeeID_AssignTo } = req.params;

//   const query = `
//     SELECT 
//         w.*, t.*
//     FROM
//         tb_workGroup as w
//         INNER JOIN tb_task as t ON w.EmployeeID_AssignTo = t.EmployeeID
//     WHERE
//         w.EmployeeID_Assigner = ? AND t.EmployeeID = ?;`;

//   try {
//     const results = await queryAsync(query, [EmployeeID_Assigner, EmployeeID_AssignTo]);
//     res.status(200).json(results);
//     console.log(results);
//   } catch (error) {
//     console.error("Error executing query:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// Get all data from employees table

exports.getAllWorkGroupEmployeesData = async (req, res) => {
  const query = `
  SELECT 
    w.*, 
    e1.FirstName AS Assigner_FirstName, 
    e1.LastName AS Assigner_LastName,
    e2.FirstName AS Assignee_FirstName,
    e2.LastName AS Assignee_LastName,
    e1.Employee_Profile AS Assigner_Profile,
    e2.Employee_Profile AS Assignee_Profile,
    d.DepartmentName AS Department_Name
  FROM 
    tb_workGroup AS w
  INNER JOIN 
    tb_employee AS e1 ON w.EmployeeID_Assigner = e1.EmployeeID
  INNER JOIN
    tb_employee AS e2 ON w.EmployeeID_AssignTo = e2.EmployeeID
  INNER JOIN
    tb_department AS d ON w.DepartmentID_AssignTo = d.DepartmentID;
  `;

  try {
    const results = await queryAsync(query);
    res.status(200).json(results);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Getting all work group's data

exports.getAllWorkGroups = async (req, res) => {
  const query = "SELECT * FROM tb_workGroup ";
  try {
    const results = await queryAsync(query);
    res.status(200).json(results);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Getting all data of a particular employee's group

exports.getAllDataOfOneGroup = async (req, res) => {
  const employeeIdAssigner = req.params.EmployeeID_Assigner;
  const query = "SELECT * FROM tb_workGroup WHERE EmployeeID_Assigner = ?";
  try {
    const results = await queryAsync(query, [employeeIdAssigner]);
    res.status(200).json(results);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Updating work group's data

exports.updateWorkGroup = async (req, res) => {
  const workGroupId = req.params.WorkGroupID;
  const updatedWorkGroupData = req.body;
  const query = "UPDATE tb_workGroup SET ? WHERE WorkGroupID = ?";
  try {
    const results = await queryAsync(query, [
      updatedWorkGroupData,
      workGroupId,
    ]);

    if (results.affectedRows === 0) {
      res.status(404).json({ error: "Work group not found" });
    } else if (results.affectedRows > 0 && results.changedRows === 0) {
      res.status(200).json("Data is up to date already");
    } else {
      res.status(200).json({ message: "Work group updated successfully" });
    }
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Deleting work group's data

exports.deleteWorkGroup = async (req, res) => {
  const workGroupId = req.params.WorkGroupID;
  const query = "DELETE FROM tb_workGroup WHERE WorkGroupID = ?";
  try {
    const results = await queryAsync(query, [workGroupId]);

    if (results.affectedRows === 0) {
      res.status(404).json({ error: "Working group not found" });
    } else {
      res.status(200).json({ message: "Desired group deleted successfully" });
    }
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

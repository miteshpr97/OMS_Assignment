const { queryAsync } = require("../db");

// Logic to add alerts either multiple or single

exports.addAlert = async (req, res) => {
  const newAlert = req.body;
  
  try {
    const EmployeeID_AssignTo = newAlert.EmployeeID_AssignTo; // Array of employee IDs

    // Generate alert ID
    const maxIDQuery = 'SELECT MAX(CAST(SUBSTRING(AlertID, 3) AS SIGNED)) AS maxID FROM tb_alert';
    const results = await queryAsync(maxIDQuery);
    let nextID = 1;
    if (results && results[0].maxID !== null) {
      nextID = parseInt(results[0].maxID, 10) + 1;
    }
    const formattedID = `AT${nextID.toString().padStart(3, '0')}`;
    newAlert.AlertID = formattedID;

    // Insert alert for each employee
    const insertQuery = 'INSERT INTO tb_alert (AlertID, EmployeeID, EmployeeID_AssignTo, Alert_Note, ReminderDay, RemindBeforeEventDay, ReminderCounts, Is_Sms, Is_Whatsapp, EmailCount, PopUpCount, WhatsappCount, SmsCount, ReminderStatusCount, ReminderTime1, ReminderTime2, ReminderTime3) VALUES ?';
    const values = EmployeeID_AssignTo.map(employeeID => [
      newAlert.AlertID,
      newAlert.EmployeeID,
      employeeID,
      newAlert.Alert_Note,
      newAlert.ReminderDay,
      newAlert.RemindBeforeEventDay,
      newAlert.ReminderCounts,
      newAlert.Is_Sms,
      newAlert.Is_Whatsapp,
      newAlert.EmailCount || null,  // Use null for SQL compatibility
      newAlert.PopUpCount || null,
      newAlert.WhatsappCount || null,
      newAlert.SmsCount || null,
      newAlert.ReminderStatusCount || null,
      newAlert.ReminderTime1,
      newAlert.ReminderTime2,
      newAlert.ReminderTime3
    ]);

    await queryAsync(insertQuery, [values]);
    res.status(201).json({ message: 'Alerts added successfully.' });
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Function to retrieve all alert details.

exports.getAllAlert = async (req, res) => {
  try {
    // SQL query to retrieve all alerts and join with employee details.
    const query = `
        SELECT 
          a.*, 
          e1.FirstName AS Assigner_FirstName, 
          e2.FirstName AS Assignee_FirstName
        FROM 
          tb_alert AS a
          INNER JOIN 
          tb_employee AS e1 ON a.EmployeeID = e1.EmployeeID
          INNER JOIN
          tb_employee AS e2 ON a.EmployeeID_AssignTo = e2.EmployeeID
      `;
    const results = await queryAsync(query);
    res.status(200).json(results);
  } catch (error) {
    console.error("Error fetching all alerts:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Function to delete alert details based on the AlertID.

exports.deleteAlertDetails = async (req, res) => {
  const { AlertID, EmployeeID, EmployeeID_AssignTo } = req.params;
  // SQL query to delete an alert from the database by AlertID.
  const deleteQuery = `DELETE FROM tb_alert WHERE 
      AlertID = ?
      AND EmployeeID = ?
      AND EmployeeID_AssignTo = ?`;
  try {
    const results = await queryAsync(deleteQuery, [
      AlertID,
      EmployeeID,
      EmployeeID_AssignTo
    ]);

    if (results.affectedRows === 0) {
      res.status(404).json({ error: "Alert not found" });
    } else {
      res.status(200).json({ message: "Alert's data deleted successfully" });
    }
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

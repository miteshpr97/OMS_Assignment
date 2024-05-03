const { queryAsync } = require("../db");

// Function to add a new alert with an auto-generated ID.

exports.addAlert = async (req, res) => {
  // Extract new alert details from the request body.
  const newAlert = req.body;
  try {
    // Extracting the EmployeeID to which the alert should be assigned.
    const EmployeeID_AssignTo = req.body.EmployeeID_AssignTo;

    // SQL query to find the current maximum AlertID in the database.
    const maxIDQuery =
      "SELECT MAX(SUBSTRING(AlertID,3)) AS maxID FROM tb_alert";
    const results = await queryAsync(maxIDQuery);
    let nextID = 1;
    if (results && results[0].maxID !== null) {
      nextID = parseInt(results[0].maxID, 10) + 1;
    }
    // Format new AlertID by padding with zeros (e.g., AT001).
    const formattedAlertId = `AT${nextID.toString().padStart(3, "0")}`;
    newAlert.AlertID = formattedAlertId;

    // SQL query to insert a new alert into the database.
    const insertQuery =
      "INSERT INTO tb_alert (AlertID, EmployeeID, EmployeeID_AssignTo, Alert_Note, ReminderDay, RemindBeforeEventDay, ReminderCounts, Is_Sms, Is_Whatsapp, EmailCount, PopUpCount, WhatsappCount, SmsCount, ReminderStatusCount, ReminderTime1, ReminderTime2, ReminderTime3) VALUES ?";

    let values = [];
    // Check if EmployeeID_AssignTo is an array to handle multiple assignees.
    if (Array.isArray(EmployeeID_AssignTo)) {
      values = EmployeeID_AssignTo.map((employeeId) => [
        newAlert.AlertID,
        newAlert.EmployeeID,
        employeeId,
        newAlert.Alert_Note,
        newAlert.ReminderDay,
        newAlert.RemindBeforeEventDay,
        newAlert.ReminderCounts,
        newAlert.Is_Sms,
        newAlert.Is_Whatsapp,
        newAlert.EmailCount,
        newAlert.PopUpCount,
        newAlert.WhatsappCount,
        newAlert.SmsCount,
        newAlert.ReminderStatusCount,
        newAlert.ReminderTime1,
        newAlert.ReminderTime2,
        newAlert.ReminderTime3,
      ]);
    } else {
      throw new Error("EmployeeID_AssignTo must be an array");
    }

    // Execute the SQL query with the values.
    await queryAsync(insertQuery, [values]);
    res.status(201).json({ message: "Alert added successfully" });
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).json({ error: "Internal server Error" });
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
  const alertId = req.params.AlertID;
  // SQL query to delete an alert from the database by AlertID.
  const deleteQuery = "DELETE FROM tb_alert WHERE AlertID = ?";
  try {
    const results = await queryAsync(deleteQuery, [alertId]);

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

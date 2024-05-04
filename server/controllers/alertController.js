const { queryAsync } = require("../db");

// Function to get the highest alert ID from the database
const getHighestAlertID = async () => {
  const query =
    "SELECT MAX(CAST(SUBSTRING(AlertID, 3) AS SIGNED)) AS maxID FROM tb_alert";
  try {
    const results = await queryAsync(query);
    const maxID = results[0].maxID || 0;
    return maxID;
  } catch (error) {
    throw error; // Propagate error to be handled by caller
  }
};

// Function to generate Alert IDs like AT001, AT002, etc.
const generateAlertID = (index) => {
  const paddedIndex = String(index).padStart(3, "0"); // Ensure three-digit padding
  return `AT${paddedIndex}`;
};

// Inserting multiple alerts with auto-generated AlertID
exports.addAlert = async (req, res) => {
  const newAlerts = req.body;
  // Check if newAlerts is actually an array
  if (!Array.isArray(newAlerts)) {
    return res
      .status(400)
      .json({ error: "Invalid input: expected an array of alerts." });
  }

  try {
    const maxID = await getHighestAlertID();
    const insertQuery =
      "INSERT INTO tb_alert (AlertID, EmployeeID, EmployeeID_AssignTo, Alert_Note, ReminderDay, RemindBeforeEventDay, ReminderCounts, Is_Sms, Is_Whatsapp, EmailCount, PopUpCount, WhatsappCount, SmsCount, ReminderStatusCount, ReminderTime1, ReminderTime2, ReminderTime3) VALUES ?";
    const values = newAlerts.map((alert, index) => [
      generateAlertID(maxID + index + 1),
      alert.EmployeeID_Assigner,
      alert.EmployeeID_AssignTo,
      alert.Alert_Note,
      alert.ReminderDay,
      alert.RemindBeforeEventDay,
      alert.ReminderCounts,
      alert.Is_Sms,
      alert.Is_Whatsapp,
      alert.EmailCount,
      alert.PopUpCount,
      alert.WhatsappCount,
      alert.SmsCount,
      alert.ReminderStatusCount,
      alert.ReminderTime1,
      alert.ReminderTime2,
      alert.ReminderTime3,
    ]);

    await queryAsync(insertQuery, [values]);
    res.status(200).json({ message: "Alerts inserted successfully" });
  } catch (error) {
    console.error("Error inserting alerts:", error);
    res.status(500).json({ error: "Internal Server Error" });
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

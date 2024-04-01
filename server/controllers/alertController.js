const { queryAsync } = require("../db");

// Add multiple alert with auto generated Id

exports.addAlert = async (req, res) => {
  const newAlert = req.body;
  try {
    const EmployeeID_AssignTo = req.body.EmployeeID_AssignTo;

    const maxIDQuery =
      "SELECT MAX(SUBSTRING(AlertID,3)) AS maxID FROM tb_alert";
    const results = await queryAsync(maxIDQuery);
    let nextID = 1;
    if (results && results[0].maxID !== null) {
      nextID = parseInt(results[0].maxID, 10) + 1;
    }
    const formattedAlertId = `AT${nextID.toString().padStart(3, "0")}`;
    newAlert.AlertID = formattedAlertId;

    const insertQuery =
      "INSERT INTO tb_alert (AlertID,EmployeeID,EmployeeID_AssignTo,Alert_Note,ReminderDay,RemindBeforeEventDay,ReminderCounts,Is_Sms,Is_Whatsapp,EmailCount,PopUpCount,WhatsappCount,SmsCount,ReminderStatusCount,ReminderTime1,ReminderTime2,ReminderTime3)VALUES ?";

    let values = [];
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

    await queryAsync(insertQuery, [values]);
    res.status(201).json({ message: "Alert added successfully" });
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).json({ error: "Internal server Error" });
  }
};

// getting all alert details

exports.getAllAlert = async (req, res) => {
  try {
    const query = "SELECT * FROM tb_alert";
    const results = await queryAsync(query);
    res.status(200).json(results);
  } catch (error) {
    console.error("Error fetching all alerts:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete alert details

exports.deleteAlertDetails = async (req, res) => {
  const alertId = req.params.AlertID;
  const deleteQuery = "DELETE FROM tb_alert WHERE AlertID = ?";

  try {
    const results = await queryAsync(deleteQuery, [alertId]);

    if (results.affectedRows === 0) {
      res.status(404).json({ error: "Alert not found" });
    } else {
      res
        .status(200)
        .json({ message: "Alert's data deleted successfully" });
    }
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

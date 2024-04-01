// reminderService.js

const cron = require("node-cron");
const { sendReminder } = require("./emailServices");
const { queryAsync } = require("../db");
const { sendPopup } = require("./popupServices");
const { sendSMS, sendWhatsApp } = require("./notificationServices");

async function scheduleReminders() {
  cron.schedule("* * * * *", async () => {
    await sendReminders();
  });
}

async function sendReminders() {
  try {
    const query = `
            SELECT a.*, e.Email , e.ContactNumber
            FROM tb_alert a
            JOIN tb_employee e ON a.EmployeeID_AssignTo = e.EmployeeID;
        `;
    const results = await queryAsync(query);

    for (const row of results) {
      const {
        ReminderDay,
        RemindBeforeEventDay,
        ReminderCounts,
        Email,
        ContactNumber,
        Alert_Note,
        Is_Sms,
        Is_Whatsapp
      } = row;
      const today = new Date();
      const eventDate = new Date(
        today.getFullYear(),
        today.getMonth(),
        ReminderDay.getDate()
      );
      const daysDifference = eventDate.getDate() - today.getDate();

      if (daysDifference <= RemindBeforeEventDay && daysDifference >= 0){
        for (let i = 1; i <= ReminderCounts; i++) {
          // Parse reminderTime as hours and minutes
          const reminderTimeParts = row[`ReminderTime${i}`].split(":");
          const reminderHour = parseInt(reminderTimeParts[0]);
          const reminderMinute = parseInt(reminderTimeParts[1]);
          const currentTime = new Date();

          // Extract hour and minute from currentTime
          const currentHour = currentTime.getHours();
          const currentMinute = currentTime.getMinutes();

          // Check if current time is equal to reminder time
          if (
            currentHour === reminderHour &&
            currentMinute === reminderMinute
          ) {
              await sendReminder(Email, Alert_Note);
              sendPopup(Alert_Note);
            if (Is_Sms === 1){
              await sendSMS(ContactNumber, Alert_Note);
            } 
            if (Is_Whatsapp === 1){
              await sendWhatsApp(ContactNumber, Alert_Note); 
            }
          }
        }
      }
    }
  } catch (error) {
    console.error("Error fetching or sending reminders:", error);
  }
}

module.exports = { scheduleReminders };

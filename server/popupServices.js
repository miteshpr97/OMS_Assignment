const notifier = require("node-notifier");

function sendPopup(message) {
    notifier.notify({
      title: 'Reminder',
      message: `Please complete the task and which is ${message}`,
      sound: true, // Play a notification sound
      wait: true // Wait with callback
    });
  }

module.exports = { sendPopup };
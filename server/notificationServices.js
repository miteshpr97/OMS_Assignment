const twilio = require('twilio');
require("dotenv").config(); 

const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTHTOKEN;
const twilioPhoneNumber = process.env.TWILIOPHONENUMBER;

const client = twilio(accountSid, authToken);

async function sendSMS(phoneNumber, message) {
  try {
    console.log(phoneNumber,message);
    await client.messages.create({
      body: `You have to complete the task and the task is ${message}`,
      from: twilioPhoneNumber,
      to: phoneNumber
    });
    console.log('SMS sent successfully to', phoneNumber);
  } catch (error) {
    console.error('Error sending SMS:', error);
  }
}

async function sendWhatsApp(phoneNumber, message) {
    try {
      console.log(phoneNumber,message);
      await client.messages.create({
        body: message,
        from: `whatsapp:${twilioPhoneNumber}`, // Use WhatsApp format
        to: `whatsapp:${phoneNumber}` // Use WhatsApp format
      });
      console.log('WhatsApp message sent successfully to', phoneNumber);
    } catch (error) {
      console.error('Error sending WhatsApp message:', error);
    }
  }
  
  module.exports = { sendSMS, sendWhatsApp };
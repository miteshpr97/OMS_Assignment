const twilio = require('twilio');

const accountSid = 'AC8f63bcec1cf76d155592c7f447f1739b';
const authToken = '139fdfb7bffd5c2e37be19d9d271796e';
const twilioPhoneNumber = '+13156465132';

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
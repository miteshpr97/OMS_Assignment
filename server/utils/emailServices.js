const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service:'gmail',
    auth: {
      user: "miteshpradhan97@gmail.com",
      pass: "yliu enkl droc zmdz",
  }
});

async function sendEmail(email, subject, html) {
  const mailOptions = {
      from: 'miteshpradhan97@gmail.com',
      to: email,
      subject: subject,
      html: html
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully: ' + info.response);
    return info;
  } catch (error) {
    console.error('Error sending email: ' + error);
    throw error;
  }
}

function sendReminder(employeeEmail , Alert_Note) {
  const subject = 'Reminder';
  const html = `This is a reminder email message you have to complete your assignment which is ${Alert_Note}.`;

  return sendEmail(employeeEmail, subject, html);
}

function sendEmailForPasswordChange(email , token) {
  const subject = 'Password Reset';
  const html = `Use this token to <a href="http://localhost:3000/ResetPassword/${token}">reset your password</a>`;

  return sendEmail(email, subject, html);
}

function sendEmailForUserCredentials(Username, EmployeeID, Password) {
  const subject = 'Registration Successful';
  const html = `Dear ${Username},\n\nThank you for registering with us.\n\nYour Employee ID: ${EmployeeID}\nYour Password: ${Password}\n\nBest regards,\nYour OWM Logistics`;

  return sendEmail(Username, subject, html);
}

module.exports = { sendReminder, sendEmailForPasswordChange, sendEmailForUserCredentials};
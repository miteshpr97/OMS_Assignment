const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    // host: 'smtp.ethereal.email',
    // port: 587,
    service:'gmail',
    auth: {
      user: "miteshpradhan97@gmail.com",
      pass: "yliu enkl droc zmdz",
  }
});

function sendEmail(email, token) {
  const mailOptions = {
    from: 'miteshpradhan97@gmail.com',
    to: email,
    subject: 'Password Reset',
    html: 'Use this token to <a href="http://localhost:3306/api/userDetails/resetPassword/'+token+'">reset your password</a>'
  };

  return transporter.sendMail(mailOptions);
}

module.exports = { sendEmail };
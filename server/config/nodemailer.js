const nodemailer = require('nodemailer');

const triggerEmail = (message) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.postmarkapp.com",
    port: 587,
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD
    }
  });

  transporter.sendMail(message, (err, info) => {
    if (err) {
      console.log('Error occurred:' + err.message);
    }
    else console.log(info);
  })
}

module.exports = triggerEmail

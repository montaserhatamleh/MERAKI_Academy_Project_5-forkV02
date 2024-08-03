const nodemailer = require('nodemailer')


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL, 
      pass: process.env.PASSWORD, 
    },
  });

  const sendEmail = (req,res) => {
    
        const { name, email, message } = req.body;
      
        const mailOptions = {
          from: email,
          to: process.env.RECEIVER_EMAIL, 
          subject: `New Contact Form Submission from ${name}`,
          text: message,
        };
      
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            return res.status(500).json({ error: 'Error sending email' });
          } else {
            console.log(info);
            return res.status(200).json({ message: 'Email sent successfully' });
          }
        });
      }
    


  module.exports = {sendEmail}
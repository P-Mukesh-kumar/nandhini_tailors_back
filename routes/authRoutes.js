// routes/authRoutes.js
import express from 'express';
import nodemailer from 'nodemailer';

const authRouter = express.Router();

let email = '';
let generatedOTP = '';

// Configure Nodemailer transporter (use your own email credentials)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'sopnan500@gmail.com',
    pass: 'salkzgccfjqykude',
    
  },
});

authRouter.post('/submit-email', (req, res) => {
  const { userEmail } = req.body;
  email = userEmail;
  console.log(req.body)
  // Generate and send OTP
  generatedOTP = Math.floor(1000 + Math.random() * 9000).toString();

  // Email content
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'OTP Verification',
    text: `Your OTP is: ${generatedOTP}`,
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ message: 'Internal server error' });
    } else {
      console.log('Email sent:', info.response);
      res.status(200).json({ message: 'Email sent successfully' });
    }
  });
});

authRouter.post('/verify-otp', (req, res) => {
  const { userOTP } = req.body;

  if (userOTP === generatedOTP) {
    res.status(200).json({ message: 'OTP verified successfully' });
  } else {
    res.status(400).json({ message: 'Incorrect OTP' });
  }
});

export default authRouter;

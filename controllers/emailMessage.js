//contollers/emailmessage
import nodemailer from 'nodemailer';

export const sendVerifyEmail = async (req, res) => {
  try {
    const { customerDetails } = req.body;

    // NodeMailer configuration
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: customerDetails.email,
      subject: 'confrim message',
      text: `
        Thank you for your feedback!
        
        We will contact back soon.
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

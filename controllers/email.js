//contollers/email
import nodemailer from 'nodemailer';

export const sendOrderEmail = async (req, res) => {
  try {
    const { customerDetails, orderDetails, totalPrice } = req.body;

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
      subject: 'Order Details',
      text: `
        Thank you for your order!
        
        Customer Details:
        Name: ${customerDetails.name}
        Phone: ${customerDetails.phone}
        Email: ${customerDetails.email}
        
        Order Details:
        ${orderDetails.map((product) => `${product.name} -  ₹ ${product.price} - Quantity: ${product.quantity}`).join('\n')}

        Total Price: ₹ ${totalPrice}
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

// routes/posts.js
import express from 'express';
import emailMessage from '../models/emailMessage.js';
import { sendVerifyEmail } from '../controllers/emailMessage.js';

// .

const router = express.Router();

// Handle order placement
router.post('/', async (req, res) => {
  try {

    const { customerDetails } = req.body;
   
    console.log(req.body)
   
    const savedCustomer = await emailMessage.create({ contactDetails: customerDetails });
    console.log(savedCustomer)
    res.status(200).json({ message: 'Order placed successfully!', customerId: savedCustomer._id });
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Handle sending order email
router.post('/email-verify',sendVerifyEmail );

export default router;

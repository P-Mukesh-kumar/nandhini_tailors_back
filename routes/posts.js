// routes/posts.js
import express from 'express';
import { sendOrderEmail } from '../controllers/email.js';
import PostMessage from '../models/postMessage.js';
import { createPost, getPosts } from '../controllers/posts.js';
import moment from 'moment';

// .

const router = express.Router();

// Handle order placement
router.post('/', async (req, res) => {
  try {

    const { customerDetails, productDetails } = req.body;
   

    const formattedDate = moment(customerDetails.date, 'DD-MM-YYYY').toDate();
    // Save customer details in MongoDB
    const savedCustomer = await PostMessage.create({ contactDetails: customerDetails });

    // Save order details in MongoDB
    const orderDetails = productDetails.map((product) => ({
      ...product,
      customerId: savedCustomer._id,
    }));
    await PostMessage.findByIdAndUpdate(savedCustomer._id, { productDetails: orderDetails });

    res.status(200).json({ message: 'Order placed successfully!', customerId: savedCustomer._id });
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Handle sending order email
router.post('/send-email',sendOrderEmail );
router.get('/get-posts',getPosts)
router.post('/create',createPost)
export default router;

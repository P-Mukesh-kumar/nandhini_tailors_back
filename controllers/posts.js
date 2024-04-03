//controllers/posts

import PostMessage from '../models/postMessage.js';

export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();
    
    res.status(200).json({postMessages});
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const post = req.body;

  const newPost = new PostMessage(post);

  try {
    // Save the order details to the database
    await newPost.save();

    // Log a message with the ID to indicate successful data storage
    console.log(`Data saved in the database successfully! ID: ${newPost._id}`);

    // Send order confirmation email (Assuming you have a function named sendOrderEmail)
    sendOrderEmail(newPost.contactDetails, newPost.productDetails);

    // Respond with a success message and the new post data
    res.status(201).json({ message: 'Post created successfully', newPost });
  } catch (error) {
    console.error('Error saving post:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

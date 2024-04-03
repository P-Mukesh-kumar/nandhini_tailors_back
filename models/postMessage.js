//models/postMessage
import mongoose from 'mongoose';

const productSchema = mongoose.Schema({
  name: String,
  price: Number,
  quantity: Number,
  amount: Number,
});

const contactSchema = mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  date: {
    type: Date,
    required: true,
  },
});

const postSchema = mongoose.Schema({
  _id: {
    type: Date,  // Set the _id field to be of type Date
    default: function() {
      return new Date();  // Set the default _id value to the current date
    },
  },
  productDetails: [productSchema],
  
  contactDetails: contactSchema,
});

const PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;

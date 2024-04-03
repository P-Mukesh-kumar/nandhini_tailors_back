//models/emailMessage
import mongoose from 'mongoose';



const contactSchema = mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  message:String,
});

const postSchema = mongoose.Schema({
  _id: {
    type: Date,  // Set the _id field to be of type Date
    default: function() {
      return new Date();  // Set the default _id value to the current date
    },
  },
  contactDetails: contactSchema,
});

const emailMessage = mongoose.model('EmailMessage', postSchema);

export default emailMessage;

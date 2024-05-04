// index.js
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import postRoutes from './routes/posts.js';
import authRouter from './routes/authRoutes.js';
import emailverify from './routes/emailMessage.js';

dotenv.config();

const app = express();

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

app.use('/posts', postRoutes);
app.use('/authposts', authRouter)
app.use('/verify', emailverify)
const CONNECTION_URL = "mongodb+srv://tailor1234:okveUPmqr9PgXzMR@tailor1234.qwxjklm.mongodb.net/";
const PORT = process.env.PORT || 5000;
//mongodb+srv://tailor1234:okveUPmqr9PgXzMR@tailor1234.qwxjklm.mongodb.net/
mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
  .catch((error) => console.error(error.message));

mongoose.set('useFindAndModify', false);

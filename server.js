import dotenv from 'dotenv';
dotenv.config(); // Load environment variables

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';


import adminRoutes from './routes/admin.js';
import clientRoutes from './routes/client.js';
import expertRoutes from './routes/expert.js';
import authRoutes from './routes/auth.js';

const app = express();


app.use(cors());
app.use(express.json());


app.use('/admin', adminRoutes);
app.use('/client', clientRoutes);
app.use('/expert', expertRoutes);
app.use('/auth', authRoutes);


console.log('🔌 Connecting to:', process.env.MONGO_URL);
mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
  });
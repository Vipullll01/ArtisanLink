import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import productRoutes from './routes/productRoutes.js';
import artisanRoutes from './routes/artisanRoutes.js';
import authRoutes from './routes/authRoutes.js'; 
import orderRoutes from './routes/orderRoutes.js';

dotenv.config();

const app = express();
const cors = require('cors');

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error(`Error: ${err.message}`));

// API Routes
app.use('/api/products', productRoutes);
app.use('/api/artisans', artisanRoutes);
app.use('/api/auth', authRoutes); 
app.use('/api/orders', orderRoutes);

app.get('/', (req, res) => {
  res.send('ArtisanLink API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
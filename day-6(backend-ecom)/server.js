import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';

import productRoutes from './routes/productRoutes.js';
import userRoutes    from './routes/userRoutes.js';
import orderRoutes   from './routes/orderRoutes.js';

import { notFound, errorHandler } from './utils/errorMiddleware.js';

dotenv.config();
const app = express();

// middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(express.static('public'));

// api routes
app.use('/api/products', productRoutes);
app.use('/api/users',    userRoutes);
app.use('/api/orders',   orderRoutes);

// root route – serve SPA or a placeholder page
app.get('*', (req, res) => {
  res.sendFile(path.resolve('public', 'index.html'));
});

// error helpers
app.use(notFound);
app.use(errorHandler);

// db + server bootstrap
const PORT = process.env.PORT || 3000;
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () =>
      console.log(`Server running on port ${PORT}`)
    );
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

export default app;          // <-- exported for tests

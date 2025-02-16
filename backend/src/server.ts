import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { sequelize } from './models';
import models from './models';
import dotenv from 'dotenv';
import { router as subscriptionRoutes } from './routes/subscriptionRoutes';

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 5002;

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.FRONTEND_URL 
    : 'http://localhost:3000',
  credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/subscriptions', subscriptionRoutes);

// Database connection and server startup
sequelize.authenticate()
  .then(async () => {
    console.log('Database connected');
    
    // Sync models
    await sequelize.sync();
    console.log('Database schema synchronized');

    // Start server
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Database connection failed:', error);
    process.exit(1);
  });

export default app;

// Import Dependencies
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import router from './src/routes/router.js';
dotenv.config();

const PORT = process.env.port || 3000;

// Instantiate an Express Application
const app = express();

// Configure Express App Instance
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cors());

// This middleware adds the json header to every response
app.use('*', (req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  next();
});

// Assign Routes
app.use('/api', router);

// Handle not valid route
app.use('*', (req, res) => {
  res.status(404).json({ status: false, message: 'Endpoint Not Found' });
});

// Open Server on selected Port
app.listen(PORT, () => console.info('Server listening on port ', PORT));

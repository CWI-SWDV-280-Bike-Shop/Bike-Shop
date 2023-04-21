// Import Dependencies
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import router from './src/routes/router.js';
import mongoose from 'mongoose';
import db from './src/config/database.config.js';
import { NotFound, UserError } from './src/errors/errors.js';
dotenv.config();

// Instantiate an Express Application
const app = express();

// Configure Express App Instance
app.set('query parser', 'extended')
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cors());

// This middleware adds the json header to every response
app.use('*', (req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  next();
});

// Connect to MongoDB
mongoose
  .connect(db.MongoDBAtlas, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    ignoreUndefined: true,
  })
  .then(() => {
    console.log('Connected to database');
  });

// Assign Routes
app.use('/api', router);

// Handle not valid route
app.use(/.*/, (req, res) => {
  throw new NotFound('Endpoint Not Found');
});

app.use((err, req, res, next) => {
  if (err instanceof UserError || err instanceof mongoose.Error.ValidationError)
    res.status(err.status ?? 400).json({ error: err.message });
  else if (err) res.status(500).json({ error: 'Something broke!' });
  console.error(err.stack);
});

// Initialize PORT from .env
const PORT = process.env.PORT || 3000;

// Open Server on selected Port
app.listen(PORT, () => console.info('Server listening on port ', PORT));

export default app;

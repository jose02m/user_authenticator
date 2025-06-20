import express from 'express';
import dotenv from 'dotenv';

import apiRouter from './routes/routes.js'; // Import the main API router   
import connectDB from '../config/db.js';

const app = express();

dotenv.config(); // Load environment variables from .env file
connectDB(); // Connect to the MongoDB database

app.use(express.json()); // Middleware to parse JSON bodies
app.use('/api', apiRouter); // Mount the API router on the /api path

app.listen(process.env.PORT, () => {
    console.log('Servidor escuchando en el puerto 3000');
});
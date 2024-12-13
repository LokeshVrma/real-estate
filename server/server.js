const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const propertyRoutes = require('./routes/propertyRoutes');
const cors = require('cors');
const path = require('path')
require('dotenv').config()

const app = express();

// Middleware
app.use(express.json());
app.use(cors())
app.use(express.static(path.join(__dirname, 'public')))

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/properties', propertyRoutes);

// Start the server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));

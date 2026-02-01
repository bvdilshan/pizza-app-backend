// server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db.js'); 
const authRoutes = require('./routers/authRoutes.js');
const menuRoutes = require('./routers/menuRoutes.js')
const orderRoutes = require('./routers/orderRoutes.js');
dotenv.config();


connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use('/api/orders', orderRoutes);
// Routes
app.use('/api/auth', authRoutes);
app.use('/api/menu', menuRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
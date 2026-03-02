const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');

// 1. IMPORT ALL MODELS (Required for Sequelize Sync)
const User = require('./models/user.model');
const Match = require('./models/match.model');
const Ground = require('./models/ground.model');
const Booking = require('./models/booking.model');

// 2. IMPORT ALL ROUTES
const authRoutes = require('./modules/auth/auth.routes');
const matchRoutes = require('./modules/matches/match.routes');
const groundRoutes = require('./modules/grounds/ground.routes');
const bookingRoutes = require('./modules/bookings/booking.routes');

const app = express();

// 3. MIDDLEWARE
app.use(cors());
app.use(express.json());

// 4. REGISTER ROUTES (Versioned API)
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/matches', matchRoutes);
app.use('/api/v1/grounds', groundRoutes);
app.use('/api/v1/bookings', bookingRoutes);

// 5. START SERVER & SYNC DATABASE
const startServer = async () => {
  try {
    // Authenticate connection
    await sequelize.authenticate();
    
    // sync({ alter: true }) updates tables without deleting data
    await sequelize.sync({ alter: true }); 
    
    console.log('✅ PostgreSQL Connected & All Tables Synced!');

    app.listen(5000, () => {
      console.log('🚀 Server running on http://localhost:5000');
    });
  } catch (error) {
    console.error('❌ Database Sync Error:', error);
  }
};

startServer();
const express = require('express');
const sequelize = require('./config/database');
const authRoutes = require('./modules/auth/auth.routes');
const matchRoutes = require('./modules/matches/match.routes'); // 1. Import Match Routes
const Match = require('./models/match.model'); // 2. Import Match Model for Syncing
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/matches', matchRoutes); // 3. Use Match Routes

const startServer = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true }); // This will create the 'matches' table
    console.log('✅ PostgreSQL Connected & Tables Synced!');

    app.listen(5000, () => {
      console.log('🚀 Server running on http://localhost:5000');
    });
  } catch (error) {
    console.error('❌ Error:', error);
  }
};

startServer();
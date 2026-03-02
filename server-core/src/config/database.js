const { Sequelize } = require('sequelize');
require('dotenv').config();

// This creates the connection to your PostgreSQL database
const sequelize = new Sequelize(
  process.env.DB_NAME, 
  process.env.DB_USER, 
  process.env.DB_PASS, 
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: false, // Keeps your console clean
  }
);

module.exports = sequelize;
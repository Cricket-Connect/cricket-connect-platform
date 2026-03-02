const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Ground = sequelize.define('Ground', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  hourly_rate: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  amenities: {
    type: DataTypes.ARRAY(DataTypes.STRING), // e.g., ['Floodlights', 'Parking', 'Canteen']
    defaultValue: [],
  },
  contact_number: {
    type: DataTypes.STRING(20),
  },
  is_available: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  }
}, {
  tableName: 'grounds',
  timestamps: true,
  underscored: true,
});

module.exports = Ground;
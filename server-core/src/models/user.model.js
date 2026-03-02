const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  full_name: {
    type: DataTypes.STRING(120),
    allowNull: false,
  },
  display_name: {
    type: DataTypes.STRING(50),
  },
  email: {
    type: DataTypes.STRING(150),
    unique: true,
    allowNull: false,
    validate: { isEmail: true }
  },
  phone: {
    type: DataTypes.STRING(20),
    unique: true,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('PLAYER', 'ADMIN', 'ACADEMY'),
    defaultValue: 'PLAYER',
  },
  is_verified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  }
}, {
  tableName: 'users',
  timestamps: true, // Automatically adds createdAt and updatedAt
  underscored: true, // converts camelCase to snake_case (created_at)
});

module.exports = User;
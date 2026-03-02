const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Booking = sequelize.define('Booking', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  user_id: { type: DataTypes.UUID, allowNull: true }, // XOR part 1
  match_id: { type: DataTypes.UUID, allowNull: true }, // XOR part 2
  ground_id: { type: DataTypes.UUID, allowNull: false },
  booking_date: { type: DataTypes.DATEONLY, allowNull: false },
  time_slot: { type: DataTypes.STRING, allowNull: false }, // e.g., "18:00-20:00"
  total_amount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  payment_status: {
    type: DataTypes.ENUM('PENDING', 'PAID', 'FAILED', 'REFUNDED'),
    defaultValue: 'PENDING',
  },
  transaction_id: { type: DataTypes.STRING, unique: true }
}, {
  tableName: 'bookings',
  timestamps: true,
  underscored: true,
});

module.exports = Booking;
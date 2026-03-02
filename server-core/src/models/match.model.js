const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Match = sequelize.define('Match', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  creator_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  ground_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  match_date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('CREATED', 'LIVE', 'PENDING_VERIFICATION', 'VERIFIED', 'DISPUTED'),
    defaultValue: 'CREATED',
  },
  team_a_score: { type: DataTypes.INTEGER, defaultValue: 0 },
  team_b_score: { type: DataTypes.INTEGER, defaultValue: 0 },
  reliability_score: {
    type: DataTypes.DECIMAL(5, 2),
    defaultValue: 100.0,
  },
  blockchain_tx_hash: {
    type: DataTypes.STRING(66),
    allowNull: true,
  }
}, {
  tableName: 'matches',
  timestamps: true,
  underscored: true,
});

module.exports = Match;
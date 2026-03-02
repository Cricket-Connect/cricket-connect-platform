const express = require('express');
const router = express.Router();
const matchController = require('./match.controller');
const { protect } = require('../../middleware/auth.middleware');

// Public Routes (Anyone can see)
router.get('/', matchController.getAllMatches);
router.get('/:id', matchController.getMatchById);

// Protected Routes (Must be logged in)
router.post('/create', matchController.createMatch);

module.exports = router;
// PATCH /api/v1/matches/:id/score
router.patch('/:id/score', protect, matchController.updateMatchScore);
// PATCH /api/v1/matches/:id/finish
router.patch('/:id/finish', protect, matchController.finishMatch);
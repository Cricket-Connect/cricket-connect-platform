const express = require('express');
const router = express.Router();
const groundController = require('./ground.controller');
const { protect } = require('../../middleware/auth.middleware');

router.get('/', groundController.getAllGrounds); // Public
router.post('/add', protect, groundController.addGround); // Protected (Admin Only)

module.exports = router;
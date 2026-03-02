const express = require('express');
const router = express.Router();
const authController = require('./auth.controller');
const { protect } = require('../../middleware/auth.middleware'); // Import the guard

router.post('/register', authController.register);
router.post('/login', authController.login);

// NEW: Protected route
router.get('/me', protect, (req, res) => {
  res.status(200).json({
    success: true,
    data: {
      message: "This is a protected message!",
      user: req.user // This comes from our middleware!
    }
  });
});

module.exports = router;
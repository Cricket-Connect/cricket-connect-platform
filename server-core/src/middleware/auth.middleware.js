const jwt = require('jsonwebtoken');

const protect = async (req, res, next) => {
  let token;

  // 1. Check if the token exists in the "Authorization" header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from string "Bearer <token>"
      token = req.headers.authorization.split(' ')[1];

      // 2. Verify the token using our secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 3. Attach the user info to the request object
      // This allows the next function to know WHO is making the call
      req.user = decoded;

      next(); // Everything is good, move to the next step!
    } catch (error) {
      return res.status(401).json({
        success: false,
        error: { code: "NOT_AUTHORIZED", message: "Invalid or expired token" }
      });
    }
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      error: { code: "NO_TOKEN", message: "No token, authorization denied" }
    });
  }
};

module.exports = { protect };
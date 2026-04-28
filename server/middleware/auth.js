import jwt from "jsonwebtoken";

export const verify = (req, res, next) => {
  try {
    // TEMPORARILY DISABLED FOR TESTING
    // Check if token is provided
    const token = req.headers.authorization?.split(" ")[1];

    if (token) {
      // If token provided, verify it
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
    } else {
      // If no token, use a demo user for testing
      req.user = { userId: "69f10265e7f2dff1af02b50a" };
    }
    
    next();
  } catch (error) {
    // If token is invalid, still allow as demo user
    req.user = { userId: "69f10265e7f2dff1af02b50a" };
    next();
  }
};


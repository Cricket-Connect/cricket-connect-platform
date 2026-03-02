const User = require('../../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// 1. REGISTER: Create a new user safely
exports.register = async (req, res) => {
  try {
    const { full_name, email, phone, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        error: { code: "USER_EXISTS", message: "Email already registered" }
      });
    }

    // Hash the password (Security first!)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the user in PostgreSQL
    const newUser = await User.create({
      full_name,
      email,
      phone,
      password: hashedPassword, 
    });

    // Send the "Elite" standard response
    res.status(201).json({
      success: true,
      data: {
        id: newUser.id,
        email: newUser.email,
        role: newUser.role
      },
      meta: null
    });

  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({ 
      success: false, 
      error: { message: "Internal Server Error" } 
    });
  }
};

// 2. LOGIN: Verify user and issue a JWT "Digital ID"
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({
        success: false,
        error: { code: "INVALID_CREDENTIALS", message: "Invalid email or password" }
      });
    }

    // Check if the password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: { code: "INVALID_CREDENTIALS", message: "Invalid email or password" }
      });
    }

    // Generate the "Digital ID Card" (JWT)
    // We store the ID and Role so the server recognizes the user later
    const token = jwt.sign(
      { id: user.id, role: user.role }, 
      process.env.JWT_SECRET, 
      { expiresIn: '1h' } 
    );

    // Send the Final Elite Response
    res.status(200).json({
      success: true,
      data: {
        token, // The encrypted access token
        user: {
          id: user.id,
          full_name: user.full_name,
          role: user.role
        }
      },
      meta: null
    });

  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ 
      success: false, 
      error: { message: "Internal Server Error" } 
    });
  }
};
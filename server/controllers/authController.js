import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: "Name and email are required" });
    }

    // Check if user already exists
    let user = await User.findOne({ email });
    
    if (user) {
      // If exists, just return login
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

      return res.status(200).json({
        message: "User already exists",
        token,
        user: { id: user._id, name: user.name, email: user.email },
      });
    }

    // Create new user
    const newUser = new User({
      name,
      email,
      password: password || "demo123",
      teams: [],
    });
    
    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: { id: newUser._id, name: newUser.name, email: newUser.email },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email required" });
    }

    // TEMPORARILY DISABLED: Just generate a token for any email
    // In production, verify password here
    
    // Try to find user, if not found, create one
    let user = await User.findOne({ email });
    
    if (!user) {
      // Create new user on first login attempt
      const salt = await bcryptjs.genSalt(10);
      const hashedPassword = await bcryptjs.hash(password || "demo", salt);
      
      user = new User({
        name: email.split("@")[0],
        email,
        password: hashedPassword,
        teams: [],
      });
      await user.save();
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      message: "Login successful",
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).populate("teams");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

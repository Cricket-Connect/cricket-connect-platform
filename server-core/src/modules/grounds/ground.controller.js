const Ground = require('../../models/ground.model');

// 1. ADD GROUND: For Admins to register a new turf
exports.addGround = async (req, res) => {
  try {
    // Security Check: Only ADMINS can add grounds
    if (req.user.role !== 'ADMIN') {
      return res.status(403).json({
        success: false,
        error: { code: "FORBIDDEN", message: "Only Admins can add new grounds" }
      });
    }

    const newGround = await Ground.create(req.body);

    res.status(201).json({
      success: true,
      data: newGround
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: { message: "Internal Server Error" } });
  }
};

// 2. LIST GROUNDS: For Players to see where they can play
exports.getAllGrounds = async (req, res) => {
  try {
    const grounds = await Ground.findAll({ where: { is_available: true } });
    res.status(200).json({
      success: true,
      count: grounds.length,
      data: grounds
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: { message: "Failed to fetch grounds" } });
  }
};
const Match = require('../../models/match.model');

exports.createMatch = async (req, res) => {
  try {
    const { ground_id, match_date } = req.body;

    // The 'req.user' was attached by our Auth Middleware!
    const newMatch = await Match.create({
      creator_id: req.user.id, 
      ground_id,
      match_date,
      status: 'CREATED'
    });

    res.status(201).json({
      success: true,
      data: newMatch,
      meta: { message: "Match created successfully!" }
    });

  } catch (error) {
    console.error('Match Creation Error:', error);
    res.status(500).json({ success: false, error: { message: "Internal Server Error" } });
  }
};
// 2. GET ALL MATCHES: See every game in the system
exports.getAllMatches = async (req, res) => {
  try {
    const matches = await Match.findAll({
      order: [['match_date', 'ASC']] // Show nearest matches first
    });

    res.status(200).json({
      success: true,
      count: matches.length,
      data: matches
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: { message: "Failed to fetch matches" } });
  }
};

// 3. GET SINGLE MATCH: See details of one specific game
exports.getMatchById = async (req, res) => {
  try {
    const match = await Match.findByPk(req.params.id);

    if (!match) {
      return res.status(404).json({
        success: false,
        error: { code: "NOT_FOUND", message: "Match not found" }
      });
    }

    res.status(200).json({
      success: true,
      data: match
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: { message: "Internal Server Error" } });
  }
};

// 4. UPDATE SCORE: Update team scores and set status to LIVE
exports.updateMatchScore = async (req, res) => {
  try {
    const { team_a_score, team_b_score } = req.body;
    const match = await Match.findByPk(req.params.id);

    // 1. Check if match exists
    if (!match) {
      return res.status(404).json({
        success: false,
        error: { code: "NOT_FOUND", message: "Match not found" }
      });
    }

    // 2. Security Check: Only the creator can update the score
    if (match.creator_id !== req.user.id && req.user.role !== 'ADMIN') {
      return res.status(403).json({
        success: false,
        error: { code: "FORBIDDEN", message: "You are not authorized to update this match" }
      });
    }

    // 3. Update scores and transition state
    match.team_a_score = team_a_score ?? match.team_a_score;
    match.team_b_score = team_b_score ?? match.team_b_score;
    
    if (match.status === 'CREATED') {
      match.status = 'LIVE'; // Automatically move to LIVE once scoring starts
    }

    await match.save();

    res.status(200).json({
      success: true,
      data: match,
      meta: { message: "Score updated successfully" }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: { message: "Internal Server Error" } });
  }
};
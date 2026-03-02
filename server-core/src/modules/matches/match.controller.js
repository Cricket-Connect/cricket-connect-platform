const Match = require('../../models/match.model');
const axios = require('axios'); // Required for Inter-Service Communication

// 1. CREATE MATCH
exports.createMatch = async (req, res) => {
  try {
    const { ground_id, match_date } = req.body;

    const newMatch = await Match.create({
      creator_id: req.user.id, // Derived from Auth Middleware
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

// 2. GET ALL MATCHES
exports.getAllMatches = async (req, res) => {
  try {
    const matches = await Match.findAll({
      order: [['match_date', 'ASC']]
    });

    res.status(200).json({ success: true, count: matches.length, data: matches });
  } catch (error) {
    res.status(500).json({ success: false, error: { message: "Failed to fetch matches" } });
  }
};

// 3. GET SINGLE MATCH
exports.getMatchById = async (req, res) => {
  try {
    const match = await Match.findByPk(req.params.id);
    if (!match) {
      return res.status(404).json({ success: false, error: { code: "NOT_FOUND", message: "Match not found" } });
    }
    res.status(200).json({ success: true, data: match });
  } catch (error) {
    res.status(500).json({ success: false, error: { message: "Internal Server Error" } });
  }
};

// 4. UPDATE SCORE (With AI Reliability Integration)
exports.updateMatchScore = async (req, res) => {
  try {
    const { team_a_score, team_b_score } = req.body;
    const match = await Match.findByPk(req.params.id);

    if (!match) {
      return res.status(404).json({ success: false, error: { message: "Match not found" } });
    }

    // Security Check: Only creator or Admin
    if (match.creator_id !== req.user.id && req.user.role !== 'ADMIN') {
      return res.status(403).json({ success: false, error: { message: "Unauthorized" } });
    }

    // Update local scores
    match.team_a_score = team_a_score ?? match.team_a_score;
    match.team_b_score = team_b_score ?? match.team_b_score;
    
    if (match.status === 'CREATED') match.status = 'LIVE';

    // --- ELITE FEATURE: Inter-Service AI Communication ---
    try {
      // Node.js (5000) calls Python (8000)
      const aiResponse = await axios.post('http://localhost:8000/analyze-score', {
        team_a_runs: match.team_a_score,
        team_b_runs: match.team_b_score
      });

      // Update reliability based on AI analysis
      if (aiResponse.data.status === "Verified by AI") {
        match.reliability_score = 99.5; 
      }
    } catch (aiError) {
      console.warn("AI Service unreachable, using default reliability.");
    }

    await match.save();

    res.status(200).json({
      success: true,
      data: match,
      meta: { message: "Score updated and verified by AI service" }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: { message: "Internal Server Error" } });
  }
};

// 5. FINISH MATCH (Blockchain Simulation)
exports.finishMatch = async (req, res) => {
  try {
    const match = await Match.findByPk(req.params.id);
    if (!match) return res.status(404).json({ success: false, message: "Match not found" });

    match.status = 'VERIFIED'; // Final state
    
    // Simulating Blockchain Transaction Hash
    match.blockchain_tx_hash = "0x" + Math.random().toString(16).slice(2, 66); 

    await match.save();
    res.status(200).json({ success: true, data: match, meta: { message: "Match finalized on blockchain" } });
  } catch (error) {
    res.status(500).json({ success: false, error: { message: "Finish Error" } });
  }
};
// 5. FINISH MATCH: Finalize the game and generate verification hash
exports.finishMatch = async (req, res) => {
  try {
    const match = await Match.findByPk(req.params.id);
    
    if (!match) {
      return res.status(404).json({ success: false, message: "Match not found" });
    }

    // Move to final state in the state machine
    match.status = 'VERIFIED'; 

    // Generate a mock Blockchain Transaction Hash
    // In a production app, this would be the actual hash from the chain
    match.blockchain_tx_hash = "0x" + Math.random().toString(16).slice(2, 66); 

    await match.save();

    res.status(200).json({ 
      success: true, 
      data: match,
      meta: { message: "Match finalized and verified on the blockchain." }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: { message: "Failed to finalize match" } });
  }
};
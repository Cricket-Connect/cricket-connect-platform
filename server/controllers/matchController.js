import Match from "../models/Match.js";

export const createMatch = async (req, res) => {
  try {
    const { title, teamId, maxPlayers, location, dateTime } = req.body;

    if (!title || !maxPlayers || !location || !dateTime) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newMatch = new Match({
      title,
      createdBy: req.user.userId,
      teamId: teamId || null,
      maxPlayers,
      location,
      dateTime,
      playersJoined: [req.user.userId],
    });

    await newMatch.save();

    res.status(201).json({
      message: "Match created successfully",
      match: newMatch,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getAllMatches = async (req, res) => {
  try {
    const matches = await Match.find()
      .populate("createdBy", "name email")
      .populate("teamId", "name")
      .populate("playersJoined", "name email");

    res.json(matches);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const joinMatch = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    const match = await Match.findById(id);
    if (!match) {
      return res.status(404).json({ message: "Match not found" });
    }

    if (match.playersJoined.includes(userId)) {
      return res.status(400).json({ message: "Already joined this match" });
    }

    if (match.playersJoined.length >= match.maxPlayers) {
      return res
        .status(400)
        .json({ message: "Match is full, cannot join" });
    }

    match.playersJoined.push(userId);

    // Update match status if full
    if (match.playersJoined.length === match.maxPlayers) {
      match.status = "full";
    }

    await match.save();

    res.json({
      message: "Joined match successfully",
      match,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getMatchById = async (req, res) => {
  try {
    const { id } = req.params;

    const match = await Match.findById(id)
      .populate("createdBy", "name email")
      .populate("teamId", "name")
      .populate("playersJoined", "name email");

    if (!match) {
      return res.status(404).json({ message: "Match not found" });
    }

    res.json(match);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

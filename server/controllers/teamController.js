import Team from "../models/Team.js";
import User from "../models/User.js";
import ChatRoom from "../models/ChatRoom.js";

export const createTeam = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Team name is required" });
    }

    const newTeam = new Team({
      name,
      captainId: req.user.userId,
      members: [req.user.userId],
    });

    await newTeam.save();

    // Add team to user's teams
    await User.findByIdAndUpdate(req.user.userId, {
      $push: { teams: newTeam._id },
    });

    // Create chat room for team
    const chatRoom = new ChatRoom({
      type: "team",
      referenceId: newTeam._id,
      members: [req.user.userId],
    });
    await chatRoom.save();

    res.status(201).json({
      message: "Team created successfully",
      team: newTeam,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getTeam = async (req, res) => {
  try {
    const { id } = req.params;

    const team = await Team.findById(id)
      .populate("captainId", "name email")
      .populate("members", "name email");

    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    res.json(team);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const joinTeam = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    const team = await Team.findById(id);
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    if (team.members.includes(userId)) {
      return res.status(400).json({ message: "Already a member of this team" });
    }

    team.members.push(userId);
    await team.save();

    await User.findByIdAndUpdate(userId, { $push: { teams: id } });

    // Add user to chat room
    await ChatRoom.findOneAndUpdate(
      { referenceId: id },
      { $push: { members: userId } }
    );

    res.json({
      message: "Joined team successfully",
      team,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getAllTeams = async (req, res) => {
  try {
    const teams = await Team.find()
      .populate("captainId", "name email")
      .populate("members", "name email");

    res.json(teams);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

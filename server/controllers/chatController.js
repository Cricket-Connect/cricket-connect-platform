import Message from "../models/Message.js";
import ChatRoom from "../models/ChatRoom.js";

export const getMessages = async (req, res) => {
  try {
    const { roomId } = req.params;

    // Verify user is member of this room
    const room = await ChatRoom.findById(roomId);
    if (!room) {
      return res.status(404).json({ message: "Chat room not found" });
    }

    if (!room.members.includes(req.user.userId)) {
      return res
        .status(403)
        .json({ message: "Not authorized to access this chat room" });
    }

    const messages = await Message.find({ roomId })
      .populate("senderId", "name email")
      .sort({ createdAt: 1 });

    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { roomId, content } = req.body;

    if (!roomId || !content) {
      return res.status(400).json({ message: "RoomId and content required" });
    }

    // Verify user is member of this room
    const room = await ChatRoom.findById(roomId);
    if (!room) {
      return res.status(404).json({ message: "Chat room not found" });
    }

    if (!room.members.includes(req.user.userId)) {
      return res
        .status(403)
        .json({ message: "Not authorized to send messages in this room" });
    }

    const message = new Message({
      roomId,
      senderId: req.user.userId,
      content,
    });

    await message.save();
    await message.populate("senderId", "name email");

    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

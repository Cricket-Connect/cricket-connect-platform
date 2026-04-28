import ChatRoom from "../models/ChatRoom.js";
import Message from "../models/Message.js";
import jwt from "jsonwebtoken";

export const initializeSocket = (io) => {
  io.use(async (socket, next) => {
    try {
      // TEMPORARILY DISABLED: Accept any connection
      const token = socket.handshake.auth.token;
      
      if (token) {
        try {
          const decoded = jwt.verify(token, process.env.JWT_SECRET);
          socket.userId = decoded.userId;
        } catch (e) {
          socket.userId = "69f10265e7f2dff1af02b50a"; // Demo user
        }
      } else {
        socket.userId = "69f10265e7f2dff1af02b50a"; // Demo user
      }
      next();
    } catch (error) {
      socket.userId = "69f10265e7f2dff1af02b50a"; // Demo user as fallback
      next();
    }
  });

  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    // Join room
    socket.on("join_room", async (data) => {
      try {
        const { roomId } = data;
        const userId = socket.userId;

        // Verify user is member of this room
        const room = await ChatRoom.findById(roomId);
        if (!room) {
          return socket.emit("error", "Room not found");
        }

        if (!room.members.includes(userId)) {
          return socket.emit("error", "Not authorized to join this room");
        }

        socket.join(roomId);
        socket.emit("room_joined", { roomId, message: "Joined room" });
        io.to(roomId).emit("user_joined", { userId, message: "User joined" });
      } catch (error) {
        socket.emit("error", error.message);
      }
    });

    // Send message
    socket.on("send_message", async (data) => {
      try {
        const { roomId, content } = data;
        const userId = socket.userId;

        // Verify user is member of this room
        const room = await ChatRoom.findById(roomId);
        if (!room) {
          return socket.emit("error", "Room not found");
        }

        if (!room.members.includes(userId)) {
          return socket.emit(
            "error",
            "Not authorized to send messages in this room"
          );
        }

        // Create and save message
        const message = new Message({
          roomId,
          senderId: userId,
          content,
        });

        await message.save();
        await message.populate("senderId", "name email");

        // Emit message to all users in room
        io.to(roomId).emit("receive_message", message);
      } catch (error) {
        socket.emit("error", error.message);
      }
    });

    // Leave room
    socket.on("leave_room", (data) => {
      const { roomId } = data;
      socket.leave(roomId);
      io.to(roomId).emit("user_left", {
        userId: socket.userId,
        message: "User left",
      });
    });

    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });
};

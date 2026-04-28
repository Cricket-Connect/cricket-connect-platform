import "dotenv/config";
import http from "http";
import { Server } from "socket.io";
import app from "./app.js";
import { connectDB } from "./config/db.js";
import { initializeSocket } from "./socket/socketHandler.js";

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: function (origin, callback) {
      // Allow localhost and any app.github.dev or amazonaws.com domains
      if (
        !origin ||
        origin.includes("localhost") ||
        origin.includes("127.0.0.1") ||
        origin.includes(".app.github.dev") ||
        origin.includes(".amazonaws.com") ||
        origin.includes("vercel.app") ||
        origin.includes("netlify.app")
      ) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Initialize Socket.IO
initializeSocket(io);

// Connect to MongoDB
connectDB();

// Start server
server.listen(PORT, () => {
  console.log(`Cricket Connect Server running on port ${PORT}`);
});

export { io };

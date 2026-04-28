import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import teamRoutes from "./routes/teamRoutes.js";
import matchRoutes from "./routes/matchRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";

const app = express();

// Middleware
app.use(cors({
  origin: function (origin, callback) {
    // Allow all origins in development
    // In production, you should restrict this
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
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/teams", teamRoutes);
app.use("/api/matches", matchRoutes);
app.use("/api/chat", chatRoutes);

// Health check
app.get("/health", (req, res) => {
  res.json({ message: "Server is running" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res
    .status(err.status || 500)
    .json({ message: err.message || "Internal server error" });
});

export default app;

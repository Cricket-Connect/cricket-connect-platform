import mongoose from "mongoose";

const matchSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    teamId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
      default: null,
    },
    playersJoined: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    maxPlayers: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    dateTime: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["open", "full", "completed"],
      default: "open",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Match", matchSchema);

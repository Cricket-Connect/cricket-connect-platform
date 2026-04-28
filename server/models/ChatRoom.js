import mongoose from "mongoose";

const chatRoomSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["team"],
      required: true,
    },
    referenceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
      required: true,
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("ChatRoom", chatRoomSchema);

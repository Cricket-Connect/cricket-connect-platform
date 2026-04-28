import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import dotenv from "dotenv";

dotenv.config({ path: "./server/.env" });

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    teams: [mongoose.Schema.Types.ObjectId],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

async function createDemoUser() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    // Delete existing demo user
    await User.deleteOne({ email: "demo@cricket.com" });

    // Create new demo user
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash("password123", salt);

    const demoUser = new User({
      name: "Demo User",
      email: "demo@cricket.com",
      password: hashedPassword,
      teams: [],
    });

    await demoUser.save();
    console.log("✅ Demo user created successfully!");
    console.log("\n📝 LOGIN CREDENTIALS:\n");
    console.log("Email: demo@cricket.com");
    console.log("Password: password123");

    await mongoose.disconnect();
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
}

createDemoUser();

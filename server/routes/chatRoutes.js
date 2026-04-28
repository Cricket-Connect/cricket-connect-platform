import express from "express";
import { getMessages, sendMessage } from "../controllers/chatController.js";
import { verify } from "../middleware/auth.js";

const router = express.Router();

router.get("/:roomId/messages", verify, getMessages);
router.post("/send", verify, sendMessage);

export default router;

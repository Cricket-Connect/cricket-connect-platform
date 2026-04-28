import express from "express";
import { register, login, getMe } from "../controllers/authController.js";
import { verify } from "../middleware/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", verify, getMe);

export default router;

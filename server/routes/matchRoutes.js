import express from "express";
import {
  createMatch,
  getAllMatches,
  joinMatch,
  getMatchById,
} from "../controllers/matchController.js";
import { verify } from "../middleware/auth.js";

const router = express.Router();

router.post("/", verify, createMatch);
router.get("/", verify, getAllMatches);
router.get("/:id", verify, getMatchById);
router.post("/:id/join", verify, joinMatch);

export default router;

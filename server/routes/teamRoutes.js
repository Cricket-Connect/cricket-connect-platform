import express from "express";
import {
  createTeam,
  getTeam,
  joinTeam,
  getAllTeams,
} from "../controllers/teamController.js";
import { verify } from "../middleware/auth.js";

const router = express.Router();

router.post("/", verify, createTeam);
router.get("/", verify, getAllTeams);
router.get("/:id", verify, getTeam);
router.post("/:id/join", verify, joinTeam);

export default router;

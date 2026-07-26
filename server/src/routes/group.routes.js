import express from "express";
import {
  createGroup,
  getGroupById,
  getGroups,
  joinGroup,
} from "../controllers/group.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", protect, createGroup);
router.get("/", protect, getGroups);
router.get("/:id", protect, getGroupById);
router.post("/join", protect, joinGroup);

export default router;

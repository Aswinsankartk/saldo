import express from "express";
import { createGroup } from "../controllers/group.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", protect, createGroup);

export default router;

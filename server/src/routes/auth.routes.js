import express from "express";
import {
  loginUser,
  registerUser,
  getMe,
} from "./../controllers/auth.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getMe);

export default router;

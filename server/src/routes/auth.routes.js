import express from "express";
import { registerUser } from "./../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", (req, res) => {});

router.post("/login", (req, res) => {});

router.get("/:id", (req, res) => {});

export default router;

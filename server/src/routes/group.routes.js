import express from "express";
import {
  createGroup,
  getGroupById,
  getGroups,
  joinGroup,
  leaveGroup,
  transferOwner,
} from "../controllers/group.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { validateObjectId } from "../middleware/validateObjectId.middleware.js";

const router = express.Router();

router.post("/", protect, createGroup);
router.get("/", protect, getGroups);
router.get("/:id", protect, validateObjectId("id"), getGroupById);
router.post("/join", protect, joinGroup);
router.delete("/:id/leave", protect, validateObjectId("id"), leaveGroup);
router.patch(
  "/:id/transfer-owner",
  protect,
  validateObjectId("id"),
  transferOwner,
);

export default router;

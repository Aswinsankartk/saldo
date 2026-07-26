import express from "express";
import {
  acceptFriendRequest,
  getFriends,
  getPendingRequests,
  rejectFriendRequest,
  sendFriendRequest,
} from "../controllers/friend.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { validateObjectId } from "../middleware/validateObjectId.middleware.js";

const router = express.Router();

router.post("/request", protect, sendFriendRequest);
router.patch(
  "/request/:requestId/accept",
  protect,
  validateObjectId("requestId"),
  acceptFriendRequest,
);
router.patch(
  "/request/:requestId/reject",
  protect,
  validateObjectId("requestId"),
  rejectFriendRequest,
);
router.get("/pending", protect, getPendingRequests);
router.get("/", protect, getFriends);

export default router;

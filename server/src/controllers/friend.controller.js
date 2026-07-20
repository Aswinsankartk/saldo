import FriendRequest from "../models/friendRequest.model.js";
import User from "../models/user.model.js";
import { acceptRequest } from "../services/friend.service.js";

export const sendFriendRequest = async (req, res) => {
  const senderId = req.user._id;
  const { receiverId } = req.body;
  if (!receiverId) {
    return res.status(400).json({
      success: false,
      message: "ReceiverId is required",
    });
  }
  const receiver = await User.findById(receiverId);
  if (!receiver) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }
  if (senderId.toString() === receiverId) {
    return res.status(400).json({
      success: false,
      message: "User cannot send request to themselves",
    });
  }
  const isFriend = await User.findOne({
    _id: senderId,
    friends: receiverId,
  });
  if (isFriend) {
    return res.status(409).json({
      success: false,
      message: "You are already friends",
    });
  }
  const reverseRequest = await FriendRequest.findOne({
    sender: receiverId,
    receiver: senderId,
    status: "pending",
  });
  if (reverseRequest) {
    await acceptRequest(reverseRequest);

    return res.status(200).json({
      success: true,
      message: "Friend request accepted successfully",
    });
  }
  const duplicateRequest = await FriendRequest.findOne({
    sender: senderId,
    receiver: receiverId,
    status: "pending",
  });
  if (duplicateRequest) {
    return res.status(409).json({
      success: false,
      message: "User already sent a request",
    });
  }
  await FriendRequest.create({
    sender: senderId,
    receiver: receiverId,
  });
  return res.status(201).json({
    success: true,
    message: "Friend request sent successfully",
  });
};

export const acceptFriendRequest = async (req, res) => {
  const { requestId } = req.params;
  const friendRequest = await FriendRequest.findById(requestId);
  if (!friendRequest) {
    return res.status(404).json({
      success: false,
      message: "Request does not exist",
    });
  }
  if (friendRequest.status !== "pending") {
    return res.status(409).json({
      success: false,
      message: "No such pending request",
    });
  }
  if (!friendRequest.receiver.equals(req.user._id)) {
    return res.status(403).json({
      success: false,
      message: "You are not authorized to accept this request",
    });
  }
  await acceptRequest(friendRequest);
  return res.status(200).json({
    success: true,
    message: "Request Accepted",
  });
};

export const rejectFriendRequest = async (req, res) => {
  const { requestId } = req.params;
  const friendRequest = await FriendRequest.findById(requestId);
  if (!friendRequest) {
    return res.status(404).json({
      success: false,
      message: "Request does not exist",
    });
  }
  if (friendRequest.status !== "pending") {
    return res.status(409).json({
      success: false,
      message: "No such pending request",
    });
  }
  if (!friendRequest.receiver.equals(req.user._id)) {
    return res.status(403).json({
      success: false,
      message: "You are not authorized to reject this request",
    });
  }
  friendRequest.status = "rejected";
  await friendRequest.save();
  return res.status(200).json({
    success: true,
    message: "Request rejected",
  });
};

export const getPendingRequests = async (req, res) => {
  const pendingRequests = await FriendRequest.find({
    receiver: req.user._id,
    status: "pending",
  }).populate("sender", "name username");
  return res.status(200).json({
    success: true,
    message: "Pending requests fetched successfully",
    data: pendingRequests,
  });
};

export const getFriends = async (req, res) => {
  const user = await User.findById(req.user._id).populate(
    "friends",
    "name username",
  );
  return res.status(200).json({
    success: true,
    data: user.friends,
  });
};

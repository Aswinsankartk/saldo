import FriendRequest from "../models/friendRequest.model.js";
import User from "../models/user.model.js";

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
  if (!receiverExist) {
    return res.status(404).json({
      success: false,
      message: "Receiver invalid",
    });
  }
  if (senderId.toString() === receiverId) {
    return res.status(400).json({
      success: false,
      message: "User cannot send request to themselves",
    });
  }
  const duplicateRequest = await FriendRequest.findOne({
    sender: senderId,
    receiver: receiverId,
    status: "pending",
  });
  if (duplicateRequest) {
    return res.status(400).json({
      success: false,
      message: "User already sent a request",
    });
  }
  const reverseRequest = await FriendRequest.findOne({
    sender: receiverId,
    receiver: senderId,
    status: "pending",
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
  friendRequest.status = "accepted";
  await friendRequest.save();
  await User.findByIdAndUpdate(friendRequest.receiver, {
    $addToSet: {
      friends: friendRequest.sender,
    },
  });
  await User.findByIdAndUpdate(friendRequest.sender, {
    $addToSet: {
      friends: friendRequest.receiver,
    },
  });
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

export const getPendingRequests = async () => {};

export const getFriends = async () => {};

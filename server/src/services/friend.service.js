import User from "../models/user.model.js";

export const acceptRequest = async (friendRequest) => {
  const { sender, receiver } = friendRequest;
  friendRequest.status = "accepted";
  await friendRequest.save();
  await Promise.all([
    User.findByIdAndUpdate(sender, {
      $addToSet: {
        friends: receiver,
      },
    }),
    User.findByIdAndUpdate(receiver, {
      $addToSet: {
        friends: sender,
      },
    }),
  ]);
};

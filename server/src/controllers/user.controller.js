import User from "../models/user.model.js";

export const searchUsers = async (req, res) => {
  const { query } = req.query;
  if (!query?.trim()) {
    return res.status(400).json({
      success: false,
      message: "Input field cannot be empty",
    });
  }
  const users = await User.find({
    _id: {
      $ne: req.user._id,
    },
    $or: [
      {
        username: {
          $regex: new RegExp(`^${query}`, "i"),
        },
      },
      {
        name: {
          $regex: new RegExp(`^${query}`, "i"),
        },
      },
    ],
  })
    .select("name username")
    .limit(20);

  if (users.length === 0) {
    return res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: [],
    });
  }
  return res.status(200).json({
    success: true,
    message: "Users fetched successfully",
    data: users,
  });
};

import Group from "../models/group.model.js";
import { generateUniqueInviteCode } from "../utils/inviteCode.js";

export const createGroup = async (req, res) => {
  try {
    const { name, description, icon, currency } = req.body;
    const owner = req.user._id;

    if (!name?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Group name is required",
      });
    }
    const inviteCode = await generateUniqueInviteCode();

    const group = new Group({
      name,
      description,
      icon,
      owner,
      members: [owner],
      inviteCode,
      currency,
    });
    await group.save();
    return res.status(201).json({
      success: true,
      message: "Group created successfully",
      data: group,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

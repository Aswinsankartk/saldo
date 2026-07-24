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

export const getGroups = async (req, res) => {
  try {
    const userId = req.user._id;
    const groups = await Group.find({
      members: userId,
    })
      .sort({
        createdAt: -1,
      })
      .select("name icon currency members createdAt");
    const formattedGroups = groups.map((group) => ({
      _id: group._id,
      name: group.name,
      icon: group.icon,
      currency: group.currency,
      createdAt: group.createdAt,
      memberCount: group.members.length,
    }));
    return res.status(200).json({
      success: true,
      message: "Groups fetched successfully",
      data: formattedGroups,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getGroupById = async (req, res) => {
  try {
    const { id } = req.params;
    let group = await Group.findById(id);
    if (!group) {
      return res.status(404).json({
        success: false,
        message: "Group not found",
      });
    }
    const isMember = group.members.some((member) =>
      member.equals(req.user._id),
    );

    if (!isMember) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to view this group",
      });
    }
    group = await group.populate([
      {
        path: "owner",
        select: "name username",
      },
      {
        path: "members",
        select: "name username",
      },
    ]);
    return res.status(200).json({
      success: true,
      message: "Group fetched successfully",
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

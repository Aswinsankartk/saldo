import Group from "../models/group.model.js";
export const generateInviteCode = () => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let inviteCode = "";
  for (let i = 0; i < 6; i++) {
    let index = Math.floor(Math.random() * characters.length);
    inviteCode += characters[index];
  }
  return inviteCode;
};

export const generateUniqueInviteCode = async () => {
  let inviteCode;
  let existingGroup;
  do {
    inviteCode = generateInviteCode();
    existingGroup = await Group.findOne({ inviteCode });
  } while (existingGroup);
  {
    return inviteCode;
  }
};

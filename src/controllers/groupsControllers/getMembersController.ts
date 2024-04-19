import { Request, Response } from "express";
import { getMembers } from "../../services/groups/getMembers";

// @desc    get members of a group
// @route   GET /api/v1/groups/:gid/members
// @access  Private
// @param   {string} gid - Group ID.

// type authenticatedRequest = Request & {
//   userId: string;
//   username: string;
//   userRole: string;
// };

export const getMembersController = async (req: Request, res: Response) => {
  const id = req.params.gid;

  const data = await getMembers(id);

  res.status(200).json(data);
};

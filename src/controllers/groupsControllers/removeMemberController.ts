import { Request, Response } from "express";
import { removeMember } from "../../services/groups/removeMember";
import { authenticatedRequest } from "../../middlewares/middleware.types";

// @desc    remove a member / delete join request
// @route   DELETE /api/v1/groups/:gid/members/:uid
// @access  Private
// @param   {string} gid - Group ID.
// @param   {string} uid - User ID.
export const removeMemberController = async (req: Request, res: Response) => {
  const uid = req.params.uid;
  const gid = req.params.gid;

  const currentUserId: string = (req as authenticatedRequest).userId;

  const member = await removeMember(gid, uid, currentUserId);

  res.status(200).json({
    message: "the member is no longer a member in the group",
  });
};

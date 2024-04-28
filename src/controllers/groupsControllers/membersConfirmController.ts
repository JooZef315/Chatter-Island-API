import { Request, Response } from "express";
import { confirmJoinReq } from "../../services/groups/confirmJoinReq";
import { authenticatedRequest } from "../../middlewares/middleware.types";

// @desc    confirm join request to a group from a user
// @route   PUT /api/v1/groups/:gid/members/:uid
// @access  Private
// @param   {string} gid - Group ID.
// @param   {string} uid - User ID.
export const membersConfirmController = async (req: Request, res: Response) => {
  const uid = req.params.uid;
  const gid = req.params.gid;

  const currentUserId: string = (req as authenticatedRequest).userId;

  await confirmJoinReq(gid, uid, currentUserId);

  res.status(200).json({
    message:
      "join request was confirmed successfully, now you can chat with other members of the group!",
  });
};

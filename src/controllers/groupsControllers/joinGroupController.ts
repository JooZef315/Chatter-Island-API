import { Request, Response } from "express";
import { joinGroup } from "../../services/groups/joinGroup";
import { authenticatedRequest } from "../../middlewares/middleware.types";

// @desc    send a join request to a group
// @route   POST /api/v1/groups/:gid/join
// @access  Private
// @param   {string} id - group ID.
export const joinGroupController = async (req: Request, res: Response) => {
  const id = req.params.gid;

  const currentUserId: string = (req as authenticatedRequest).userId;

  await joinGroup(id, currentUserId);

  res.status(200).json({
    message: `your joun request was sent successfully`,
  });
};

import { Request, Response } from "express";
import { joinGroup } from "../../services/groups/joinGroup";

// @desc    send a join request to a group
// @route   POST /api/v1/groups/:gid/join
// @access  Private
// @param   {string} id - group ID.
export const joinGroupController = async (req: Request, res: Response) => {
  const id = req.params.gid;

  const currentUserId: string = req.body.currentUserId;

  await joinGroup(id, currentUserId);

  res.status(200).json({
    message: `your joun request was sent successfully`,
  });
};

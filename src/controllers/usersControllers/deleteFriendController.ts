import { Request, Response } from "express";
import { removeFriend } from "../../services/users/removeFriend";
import { authenticatedRequest } from "../../middlewares/middleware.types";

// @desc    unfriend a user
// @route   DELETE /api/v1/users/:uid/friends
// @access  Private
// @param   {string} uid - User ID.
export const deleteFriendController = async (req: Request, res: Response) => {
  const id = req.params.uid;

  const currentUserId: string = (req as authenticatedRequest).userId;

  await removeFriend(id, currentUserId);

  res.status(200).json({
    message: `you are now unfriended successfully`,
  });
};

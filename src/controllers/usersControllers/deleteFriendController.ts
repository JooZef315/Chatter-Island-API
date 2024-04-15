import { Request, Response } from "express";
import { removeFriend } from "../../services/users/removeFriend";

// @desc    unfriend a user
// @route   DELETE /api/v1/users/:uid/follow
// @access  Private
// @param   {string} uid - User ID.

// type authenticatedRequest = Request & {
//   userId: string;
//   username: string;
//   userRole: string;
// };

export const deleteFriendController = async (req: Request, res: Response) => {
  const id = req.params.uid;

  const currentUserId: string = req.body.currentUserId;

  await removeFriend(id, currentUserId);

  res.status(200).json({
    message: `you are now unfriended successfully`,
  });
};

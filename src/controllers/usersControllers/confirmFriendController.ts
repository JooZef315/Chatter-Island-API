import { Request, Response } from "express";
import { confirmFriend } from "../../services/users/confirmFriend";

// @desc    confirm friend request from a user
// @route   PUT /api/v1/users/:uid/confirmFriend
// @access  Private
// @param   {string} uid - User ID.

// type authenticatedRequest = Request & {
//   userId: string;
//   username: string;
//   userRole: string;
// };

export const confirmFriendController = async (req: Request, res: Response) => {
  const id = req.params.uid;

  const currentUserId: string = req.body.currentUserId;

  await confirmFriend(id, currentUserId);

  res.status(200).json({
    message:
      "friend request was confirmed successfully, now you can chat with each other!",
  });
};

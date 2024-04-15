import { Request, Response } from "express";
import { addFriend } from "../../services/users/addFriend";

// @desc    send friend request to a user
// @route   POST /api/v1/users/:uid/addFriend
// @access  Private
// @param   {string} uid - User ID.

// type authenticatedRequest = Request & {
//   userId: string;
//   username: string;
//   userRole: string;
// };

export const addFriendController = async (req: Request, res: Response) => {
  const id = req.params.uid;

  const currentUserId: string = req.body.currentUserId;

  await addFriend(id, currentUserId);

  res.status(200).json({
    message: `your friend request was sent successfully`,
  });
};

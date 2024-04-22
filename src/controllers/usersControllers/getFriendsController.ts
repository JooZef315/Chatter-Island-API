import { Request, Response } from "express";
import { getFriends } from "../../services/users/getFriends";
import { authenticatedRequest } from "../../middlewares/middleware.types";

// @desc    get a user friends
// @route   GET /api/v1/users/:uid/friends
// @access  Private
// @param   {string} uid - User ID.

// type authenticatedRequest = Request & {
//   userId: string;
//   username: string;
//   userRole: string;
// };

export const getFriendsController = async (req: Request, res: Response) => {
  const id = req.params.uid;
  const currentUserId: string = (req as authenticatedRequest).userId;

  const data = await getFriends(id, currentUserId);

  res.status(200).json(data);
};

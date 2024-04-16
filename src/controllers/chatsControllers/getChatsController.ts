import { Request, Response } from "express";
import { getChats } from "../../services/chats/getChats";
import { CustomError } from "../../utils/customErrors";

// @desc    get all the chats for the current user
// @route   POST /api/v1/chats
// @access  Private

// type authenticatedRequest = Request & {
//   userId: string;
//   username: string;
//   userRole: string;
// };
export const getChatsController = async (req: Request, res: Response) => {
  const currentUserId: string = req.body.currentUserId;

  const data = await getChats(currentUserId);

  res.status(200).json(data);
};

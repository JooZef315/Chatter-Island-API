import { Request, Response } from "express";
import { getChats } from "../../services/chats/getChats";
import { CustomError } from "../../utils/customErrors";
import { authenticatedRequest } from "../../middlewares/middleware.types";

// @desc    get all the chats for the current user
// @route   GET /api/v1/chats
// @access  Private
export const getChatsController = async (req: Request, res: Response) => {
  const currentUserId: string = (req as authenticatedRequest).userId;

  const data = await getChats(currentUserId);

  res.status(200).json(data);
};

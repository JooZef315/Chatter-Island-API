import { Request, Response } from "express";
import { sendMessage } from "../../services/chats/sendMessage";
import { CustomError } from "../../utils/customErrors";

// @desc    send a new message to a user
// @route   POST /api/v1/chats/:cid
// @access  Private
// @param   {string} cid - chat ID.

// type authenticatedRequest = Request & {
//   userId: string;
//   username: string;
//   userRole: string;
// };

export const sendMessageController = async (req: Request, res: Response) => {
  const cid = req.params.cid;

  const currentUserId: string = req.body.currentUserId;
  const content: string = req.body.content;
  const parentId: string = req.body.parentId || "";

  if (!content || !content.trim()) {
    throw new CustomError("message content is required", 400);
  }

  const message = await sendMessage(cid, currentUserId, content, parentId);

  res.status(200).json(message);
};

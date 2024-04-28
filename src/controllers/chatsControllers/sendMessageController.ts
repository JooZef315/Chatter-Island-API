import { Request, Response } from "express";
import { sendMessage } from "../../services/chats/sendMessage";
import { CustomError } from "../../utils/customErrors";
import { uploadCareClient } from "../../utils/uploadCareClient";
import { authenticatedRequest } from "../../middlewares/middleware.types";

// @desc    send a new message to a user
// @route   POST /api/v1/chats/:cid
// @access  Private
// @param   {string} cid - chat ID.
export const sendMessageController = async (req: Request, res: Response) => {
  const cid = req.params.cid;

  const currentUserId: string = (req as authenticatedRequest).userId;
  const content: string = req.body.content;
  const parentId: string = req.body.parentId || "";
  let PicUrl: string | undefined;

  if (!content && !req.file) {
    throw new CustomError("message content (text or image) is required", 400);
  }

  if (!content?.trim() && !req.file) {
    throw new CustomError("message content (text or image) is required", 400);
  }

  if (req.file) {
    PicUrl = (await uploadCareClient(req.file.path)) || undefined;
  }

  const messageData = {
    cid,
    content,
    parentId,
    PicUrl,
  };

  const message = await sendMessage(currentUserId, messageData);

  res.status(200).json(message);
};

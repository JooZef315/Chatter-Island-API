import { Request, Response } from "express";
import { deleteMessage } from "../../services/chats/deleteMessage";
import { authenticatedRequest } from "../../middlewares/middleware.types";

// @desc    delete a message
// @route   DELETE /api/v1/chats/:cid/:mid
// @access  Private
// @param   {string} cid - chat ID.
// @param   {string} mid - message ID.
export const deleteMessageController = async (req: Request, res: Response) => {
  const cid = req.params.cid;
  const mid = req.params.mid;

  const currentUserId: string = (req as authenticatedRequest).userId;

  await deleteMessage(currentUserId, cid, mid);

  res.status(200).json({
    message: "message was deleted successfully",
  });
};

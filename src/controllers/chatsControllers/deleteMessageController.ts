import { Request, Response } from "express";
import { deleteMessage } from "../../services/chats/deleteMessage";

// @desc    delete a message
// @route   DELETE /api/v1/chats/:cid/:mid
// @access  Private
// @param   {string} cid - chat ID.
// @param   {string} mid - message ID.

export const deleteMessageController = async (req: Request, res: Response) => {
  const cid = req.params.cid;
  const mid = req.params.mid;

  const currentUserId: string = req.body.currentUserId;

  await deleteMessage(currentUserId, cid, mid);

  res.status(200).json({
    message: "message was deleted successfully",
  });
};

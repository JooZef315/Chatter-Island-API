import { Request, Response } from "express";
import { getAChat } from "../../services/chats/getAChat";

// @desc    get messages in a single chat
// @route   GET /api/v1/chats/:cid/
// @access  Private
// @param   {string} cid - chat ID.
// @query   {number} page - Optional. for pagination.

const MESSAGES_PER_PAGE = 2;

export const getChatController = async (req: Request, res: Response) => {
  const page = +req.query.page! || 1;
  const cid: string = req.params.cid;

  const data = await getAChat(cid, page, MESSAGES_PER_PAGE);

  res.status(200).json(data);
};

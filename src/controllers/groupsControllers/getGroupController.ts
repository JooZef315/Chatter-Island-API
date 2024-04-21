import { Request, Response } from "express";
import { getAGroupChat } from "../../services/groups/getAGroupChat";

// @desc    get messages in a group chat
// @route   GET /api/v1/groups/:gid/
// @access  Private
// @param   {string} gid - Group ID.
// @query   {number} page - Optional. for pagination.

const MESSAGES_PER_PAGE = 2;

export const getGroupController = async (req: Request, res: Response) => {
  const page = +req.query.page! || 1;
  const gid: string = req.params.gid;

  const data = await getAGroupChat(gid, page, MESSAGES_PER_PAGE);

  res.status(200).json(data);
};

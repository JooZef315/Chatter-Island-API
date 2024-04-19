import { Request, Response } from "express";
import { getGroups } from "../../services/groups/getGroups";

// @desc    get all groups
// @route   GET /api/v1/groups
// @access  Private
export const getGroupsController = async (req: Request, res: Response) => {
  const data = await getGroups();

  res.status(200).json(data);
};

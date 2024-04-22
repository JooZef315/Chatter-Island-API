import { Request, Response } from "express";
import { validateGroup } from "../../validators/groupValidator";
import { CustomError } from "../../utils/customErrors";
import { createGroup } from "../../services/groups/createGroup";
import { authenticatedRequest } from "../../middlewares/middleware.types";

// @desc    create a group
// @route   POST /api/v1/groups/
// @access  Private
export const createGroupController = async (req: Request, res: Response) => {
  const currentUserId: string = (req as authenticatedRequest).userId;

  const { groupData, error } = validateGroup(req.body);

  if (error) {
    throw new CustomError(error.message, 400);
  }

  const group = await createGroup(groupData, currentUserId);

  res.status(200).json(group);
};

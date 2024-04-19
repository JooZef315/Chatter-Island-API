import { Request, Response } from "express";
import { validateGroup } from "../../validators/groupValidator";
import { CustomError } from "../../utils/customErrors";
import { editGroup } from "../../services/groups/editGroup";

// @desc    edit a group
// @route   PUT /api/v1/groups/:gid
// @access  Private
// @param   {string} gid - group ID.
export const editGroupController = async (req: Request, res: Response) => {
  const id = req.params.gid;
  const currentUserId: string = req.body.currentUserId;

  const { groupData, error } = validateGroup(req.body);

  if (error) {
    throw new CustomError(error.message, 400);
  }

  const updatedGroup = await editGroup(id, groupData, currentUserId);

  res.status(200).json(updatedGroup);
};

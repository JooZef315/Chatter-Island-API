import { Request, Response } from "express";
import { deleteGroup } from "../../services/groups/deleteGroup";

// @desc    delete a group
// @route   DELETE /api/v1/groups/:gid
// @access  Private
// @param   {string} gid - group ID.
export const deleteGroupController = async (req: Request, res: Response) => {
  const id = req.params.gid;
  const currentUserId: string = req.body.currentUserId;

  const deletedGroup = await deleteGroup(id, currentUserId);

  res.status(200).json({
    message: `group ${deletedGroup.name} was deleted successfully`,
  });
};

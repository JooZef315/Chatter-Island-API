import { Request, Response } from "express";
import { deleteUser } from "../../services/users/deleteUser";

// @desc    delete a user
// @route   DELETE /api/v1/users/:uid
// @access  Private
// @param   {string} uid - User ID.
export const deleteUserController = async (req: Request, res: Response) => {
  const id = req.params.uid;

  const deletedUser = await deleteUser(id);

  res.status(200).json({
    message: `user ${deletedUser.username} was deleted successfully`,
  });
};

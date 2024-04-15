import { Request, Response } from "express";
import { validateUser } from "../../validators/userValidator";
import { CustomError } from "../../utils/customErrors";
import { editUser } from "../../services/users/editUser";
import { uploadCareClient } from "../../utils/uploadCareClient";

// @desc    update a user
// @route   PUT /api/v1/users/:uid
// @access  Private
// @param   {string} uid - User ID.
export const editUserController = async (req: Request, res: Response) => {
  const id = req.params.uid;
  const { userData, error } = validateUser(req.body);

  if (error) {
    throw new CustomError(error.message, 400);
  }

  if (req.file) {
    const profilePic = (await uploadCareClient(req.file.path)) || undefined;
    userData.profilePicUrl = profilePic;
  }

  const updatedUser = await editUser(id, userData);

  res.status(200).json({
    message: `user with id: ${updatedUser[0].id} was updated successfully`,
  });
};

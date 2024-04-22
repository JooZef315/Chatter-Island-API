import { Request, Response } from "express";
import { validateUser } from "../../validators/userValidator";
import { CustomError } from "../../utils/customErrors";
import { editUser } from "../../services/users/editUser";
import { uploadCareClient } from "../../utils/uploadCareClient";
import { authenticatedRequest } from "../../middlewares/middleware.types";

// @desc    update a user
// @route   PUT /api/v1/users/:uid
// @access  Private
// @param   {string} uid - User ID.
export const editUserController = async (req: Request, res: Response) => {
  const id = req.params.uid;
  const currentUserId: string = (req as authenticatedRequest).userId;
  const { userData, error } = validateUser(req.body);

  if (error) {
    throw new CustomError(error.message, 400);
  }

  if (req.file) {
    const profilePic = (await uploadCareClient(req.file.path)) || undefined;
    userData.profilePicUrl = profilePic;
  }

  const updatedUser = await editUser(id, currentUserId, userData);

  res.status(200).json({
    message: `user with id: ${updatedUser[0].id} was updated successfully`,
  });
};

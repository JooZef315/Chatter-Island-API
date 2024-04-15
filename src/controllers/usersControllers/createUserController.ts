import { Request, Response } from "express";
import { validateUser } from "../../validators/userValidator";
import { CustomError } from "../../utils/customErrors";
import { uploadCareClient } from "../../utils/uploadCareClient";
import { createUser } from "../../services/users/createUser";

// @desc    signup
// @route   POST /api/v1/users/
// @access  Public
export const createUserController = async (req: Request, res: Response) => {
  const { userData, error } = validateUser(req.body);

  if (error) {
    throw new CustomError(error.message, 400);
  }

  if (req.file) {
    const profilePic = (await uploadCareClient(req.file.path)) || undefined;
    userData.profilePicUrl = profilePic;
  }

  const newUser = await createUser(userData);
  console.log(newUser);
  res.status(200).json({
    message: `new user ${newUser.username} was created successfully, please login`,
  });
};

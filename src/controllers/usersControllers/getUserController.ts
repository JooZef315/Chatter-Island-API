import { Request, Response } from "express";
import { getUser } from "../../services/users/getUser";

// TODO: use query - populate

// @desc    get a user
// @route   GET /api/v1/users/:uid
// @access  Private
// @param   {string} uid - User ID.
export const getUserController = async (req: Request, res: Response) => {
  const id = req.params.uid;

  const data = await getUser(id);

  res.status(200).json(data);
};

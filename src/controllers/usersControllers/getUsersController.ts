import { Request, Response } from "express";
import { getUsers } from "../../services/users/getUsers";

// @desc    get all users
// @route   GET /api/v1/users
// @access  Private
// @query   {string} search - Optional. for searching for a user by username.
export const getUsersController = async (req: Request, res: Response) => {
  const search: string =
    typeof req.query.search === "string"
      ? req.query.search.trim().toLowerCase()
      : "";
  const data = await getUsers(search);
  res.status(200).json(data);
};

import { Request, Response } from "express";
// import { getUser } from "../../services/users/getUser";

// @desc    get a user
// @route   GET /api/v1/users/:id
// @access  Private
// @param   {string} id - User ID.
// @query   {boolean} full - Optional. to fully populate the user.
export const getUserController = async (
  req: Request<{ id: string }, {}, {}, { full: string }>,
  res: Response
) => {
  // const id = req.params.id;
  // //convert to bollean
  // const full = req.query.full === "true";

  // const data = await getUser(id, full);

  res.status(200).json("getUserController");
};

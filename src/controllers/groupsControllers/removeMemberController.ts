import { Request, Response } from "express";

// @desc    follow/unfollow a user
// @route   POST /api/v1/users/:id/follow
// @access  Private
// @param   {string} id - User ID.

export const removeMemberController = async (req: Request, res: Response) => {
  const paramId = req.params.id;

  res.status(200).json({
    message: `removeMemberController`,
  });
};

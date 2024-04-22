import { Request, Response } from "express";
import { logIn } from "../../services/auth/logIn";
import { CustomError } from "../../utils/customErrors";

// @desc    login
// @route   POST /api/v1/auth/login
// @access  Public
export const loginController = async (req: Request, res: Response) => {
  const username: string = req.body.username?.trim().toLowerCase() || "";
  const password: string = req.body.password || "";

  if (!username || !password) {
    throw new CustomError("username and passowrd required", 400);
  }

  const { accessToken, refreshToken } = await logIn(username, password);

  // Create secure cookie with refresh token
  res.cookie("jwt", refreshToken, {
    httpOnly: true, //accessible only by web server
    secure: false, //https
    sameSite: "none", //cross-site cookie
    maxAge: 1 * 24 * 60 * 60 * 1000, //cookie expiry
  });

  res.status(200).json({ accessToken });
};

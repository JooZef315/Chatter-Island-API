import express from "express";
import asyncHandler from "express-async-handler";
import {
  loginController,
  refreshController,
  logoutController,
} from "../controllers";
import { verifyUser } from "../middlewares/authMiddlewares/verifyUserMiddleware";

export const authRouter = express.Router();

authRouter.post("/login", asyncHandler(loginController));

authRouter.get(
  "/refresh",
  asyncHandler(verifyUser),
  asyncHandler(refreshController)
);

authRouter.post(
  "/logout",
  asyncHandler(verifyUser),
  asyncHandler(logoutController)
);

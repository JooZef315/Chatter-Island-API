import express from "express";
import { authRouter } from "./authRoutes";
import { usersRouter } from "./usersRoutes";
import { chatsRouter } from "./chatsRoutes";
import { groupsRouter } from "./groupsRoutes";
import asyncHandler from "express-async-handler";

export const rootRouter = express.Router();

rootRouter.get(
  "/",
  asyncHandler(async (req, res) => {
    res.send("OK!");
  })
);

rootRouter.use("/auth", authRouter);
rootRouter.use("/users", usersRouter);
rootRouter.use("/chats", chatsRouter);
rootRouter.use("/groups", groupsRouter);

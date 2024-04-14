import express from "express";
import { authRouter } from "./authRoutes";
import { usersRouter } from "./usersRoutes";
import { chatsRouter } from "./chatsRoutes";
import { groupsRouter } from "./groupsRoutes";
import { db } from "../config/DB";
import { users } from "../drizzle/schema";
import asyncHandler from "express-async-handler";

export const rootRouter = express.Router();

rootRouter.get(
  "/",
  asyncHandler(async (req, res) => {
    // const a = await db
    //   .insert(users)
    //   .values({
    //     username: "joo",
    //     password: "1234",
    //     bio: "first user",
    //   })
    //   .returning();
    // console.log(a);
    res.send("OK!");
  })
);

rootRouter.use("/auth", authRouter);
rootRouter.use("/users", usersRouter);
rootRouter.use("/chats", chatsRouter);
rootRouter.use("/groups", groupsRouter);

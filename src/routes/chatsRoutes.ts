import express from "express";
import asyncHandler from "express-async-handler";
import {
  sendMessageController,
  deleteMessageController,
  getChatController,
  getChatsController,
} from "../controllers";
import { initUpload } from "../config/multer";
import { verifyUser } from "../middlewares/authMiddlewares/verifyUserMiddleware";
import { verifyParticipant } from "../middlewares/authMiddlewares/verifyParticipantMiddleware";

const uploadImage = initUpload("messages");

export const chatsRouter = express.Router();

chatsRouter.get(
  "/",
  asyncHandler(verifyUser),
  asyncHandler(getChatsController)
);

chatsRouter
  .route("/:cid")
  .get(asyncHandler(verifyParticipant), asyncHandler(getChatController))
  .post(
    asyncHandler(verifyParticipant),
    uploadImage.single("image"),
    asyncHandler(sendMessageController)
  );

chatsRouter
  .route("/:cid/:mid")
  .delete(asyncHandler(verifyUser), asyncHandler(deleteMessageController));

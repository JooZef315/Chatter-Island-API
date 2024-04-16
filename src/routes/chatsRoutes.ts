import express from "express";
import asyncHandler from "express-async-handler";
import {
  sendMessageController,
  deleteMessageController,
  getChatController,
  getChatsController,
} from "../controllers";
import { initUpload } from "../config/multer";

const uploadImage = initUpload("messages");

export const chatsRouter = express.Router();

chatsRouter.get("/", asyncHandler(getChatsController));

chatsRouter
  .route("/:cid")
  .get(asyncHandler(getChatController))
  .post(uploadImage.single("image"), asyncHandler(sendMessageController));

chatsRouter.route("/:cid/:mid").delete(asyncHandler(deleteMessageController)); //delete message

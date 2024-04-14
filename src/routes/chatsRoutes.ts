import express from "express";
import asyncHandler from "express-async-handler";
import {
  addMessageController,
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
  .get(asyncHandler(getChatController)) //get all chat
  .post(uploadImage.single("image"), asyncHandler(addMessageController)); //add message

chatsRouter.route("/:cid/:mid").delete(asyncHandler(deleteMessageController)); //delete message

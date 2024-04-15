import express from "express";
import asyncHandler from "express-async-handler";
import {
  getUsersController,
  createUserController,
  getUserController,
  editUserController,
  deleteUserController,
  deleteFriendController,
  getFriendsController,
  addFriendController,
  confirmFriendController,
} from "../controllers";
import { initUpload } from "../config/multer";

const uploadImage = initUpload("users");

export const usersRouter = express.Router();

usersRouter
  .route("/")
  .get(asyncHandler(getUsersController))
  .post(uploadImage.single("image"), asyncHandler(createUserController));

usersRouter
  .route("/:uid")
  .get(asyncHandler(getUserController))
  .put(uploadImage.single("image"), asyncHandler(editUserController))
  .delete(asyncHandler(deleteUserController));

usersRouter
  .route("/:uid/friends")
  .get(asyncHandler(getFriendsController)) //verify friends of friends
  .delete(asyncHandler(deleteFriendController));

usersRouter.post("/:uid/addFriend", asyncHandler(addFriendController));
usersRouter.put("/:uid/confirmFriend", asyncHandler(confirmFriendController));

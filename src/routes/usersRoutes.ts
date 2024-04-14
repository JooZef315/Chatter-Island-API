import express from "express";
import asyncHandler from "express-async-handler";
import {
  getUsersController,
  createUserController,
  getUserController,
  editUserController,
  deleteUserController,
  deleteFriendController,
  friendRequestController,
  getFriendsController,
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
  .post(asyncHandler(friendRequestController)) //send-confirm friend request
  .delete(asyncHandler(deleteFriendController)); //delete friend-friend request

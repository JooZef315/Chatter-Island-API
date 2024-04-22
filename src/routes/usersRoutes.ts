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
import { verifyUser } from "../middlewares/authMiddlewares/verifyUserMiddleware";
import { verifyOwnerOrAdmin } from "../middlewares/authMiddlewares/verifyOwnerOrAdminMiddleware";

const uploadImage = initUpload("users");

export const usersRouter = express.Router();

usersRouter
  .route("/")
  .get(asyncHandler(verifyUser), asyncHandler(getUsersController))
  .post(uploadImage.single("image"), asyncHandler(createUserController));

usersRouter
  .route("/:uid")
  .get(asyncHandler(verifyUser), asyncHandler(getUserController))
  .put(
    asyncHandler(verifyUser),
    uploadImage.single("image"),
    asyncHandler(editUserController)
  )
  .delete(asyncHandler(verifyOwnerOrAdmin), asyncHandler(deleteUserController));

usersRouter
  .route("/:uid/friends")
  .get(asyncHandler(verifyUser), asyncHandler(getFriendsController))
  .delete(asyncHandler(verifyUser), asyncHandler(deleteFriendController));

usersRouter.post(
  "/:uid/addFriend",
  asyncHandler(verifyUser),
  asyncHandler(addFriendController)
);
usersRouter.put(
  "/:uid/confirmFriend",
  asyncHandler(verifyUser),
  asyncHandler(confirmFriendController)
);

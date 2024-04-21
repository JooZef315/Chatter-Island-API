import express from "express";
import asyncHandler from "express-async-handler";
import { initUpload } from "../config/multer";
import {
  addGroupMessageController,
  createGroupController,
  deleteGroupController,
  editGroupController,
  getGroupController,
  getGroupsController,
  getMembersController,
  joinGroupController,
  membersConfirmController,
  removeMemberController,
} from "../controllers";

const uploadImage = initUpload("messages");

export const groupsRouter = express.Router();

groupsRouter
  .route("/")
  .get(asyncHandler(getGroupsController))
  .post(asyncHandler(createGroupController));

groupsRouter
  .route("/:gid")
  .get(asyncHandler(getGroupController))
  .post(uploadImage.single("image"), asyncHandler(addGroupMessageController))
  .put(asyncHandler(editGroupController))
  .delete(asyncHandler(deleteGroupController));

groupsRouter.post("/:gid/join", asyncHandler(joinGroupController));

groupsRouter.route("/:gid/members").get(asyncHandler(getMembersController));

groupsRouter
  .route("/:gid/members/:uid")
  .put(asyncHandler(membersConfirmController))
  .delete(asyncHandler(removeMemberController));

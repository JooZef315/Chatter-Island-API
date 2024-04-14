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
  membersRequestController,
  removeMemberController,
} from "../controllers";

const uploadImage = initUpload("messages");

export const groupsRouter = express.Router();

groupsRouter
  .route("/")
  .get(asyncHandler(getGroupsController)) //get all groups
  .post(asyncHandler(createGroupController)); //make group

groupsRouter
  .route("/:gid")
  .get(asyncHandler(getGroupController)) //get all chat
  .post(uploadImage.single("image"), asyncHandler(addGroupMessageController)) //add message
  .put(asyncHandler(editGroupController)) //edit details (group admin)
  .delete(asyncHandler(deleteGroupController)); //delete group (group admin)

groupsRouter.post("/:gid/join", asyncHandler(joinGroupController));

groupsRouter
  .route("/:gid/members")
  .get(asyncHandler(getMembersController)) //get members (group admin)
  .put(asyncHandler(membersRequestController)); //confirm-delete join request (group admin)

groupsRouter.delete("/:gid/members/:uid", asyncHandler(removeMemberController)); //remove member (group admin)
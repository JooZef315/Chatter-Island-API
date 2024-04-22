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
import { verifyUser } from "../middlewares/authMiddlewares/verifyUserMiddleware";
import { verifyOwnerOrAdmin } from "../middlewares/authMiddlewares/verifyOwnerOrAdminMiddleware";
import { verifyModerator } from "../middlewares/authMiddlewares/verifyModeratorMiddleware";
import { verifyParticipant } from "../middlewares/authMiddlewares/verifyParticipantMiddleware";

const uploadImage = initUpload("messages");

export const groupsRouter = express.Router();

groupsRouter
  .route("/")
  .get(asyncHandler(verifyUser), asyncHandler(getGroupsController))
  .post(asyncHandler(verifyUser), asyncHandler(createGroupController));

groupsRouter
  .route("/:gid")
  .get(asyncHandler(verifyParticipant), asyncHandler(getGroupController))
  .post(
    asyncHandler(verifyParticipant),
    uploadImage.single("image"),
    asyncHandler(addGroupMessageController)
  )
  .put(asyncHandler(verifyModerator), asyncHandler(editGroupController))
  .delete(
    asyncHandler(verifyOwnerOrAdmin),
    asyncHandler(deleteGroupController)
  );

groupsRouter.post(
  "/:gid/join",
  asyncHandler(verifyUser),
  asyncHandler(joinGroupController)
);

groupsRouter
  .route("/:gid/members")
  .get(asyncHandler(verifyParticipant), asyncHandler(getMembersController));

groupsRouter
  .route("/:gid/members/:uid")
  .put(asyncHandler(verifyModerator), asyncHandler(membersConfirmController))
  .delete(asyncHandler(verifyUser), asyncHandler(removeMemberController));

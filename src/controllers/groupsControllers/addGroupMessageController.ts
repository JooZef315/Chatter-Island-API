import { Request, Response } from "express";
import { CustomError } from "../../utils/customErrors";
import { uploadCareClient } from "../../utils/uploadCareClient";
import { sendGroupMessage } from "../../services/groups/sendGroupMessage";
import { authenticatedRequest } from "../../middlewares/middleware.types";

// @desc    send a new message to a group
// @route   POST /api/v1/groups/:gid
// @access  Private
// @param   {string} cid - Group ID.
export const addGroupMessageController = async (
  req: Request,
  res: Response
) => {
  const gid = req.params.gid;

  const currentUserId: string = (req as authenticatedRequest).userId;
  const content: string = req.body.content;
  const parentId: string = req.body.parentId || "";
  let PicUrl: string | undefined;

  if (!content && !req.file) {
    throw new CustomError("message content (text or image) is required", 400);
  }

  if (!content?.trim() && !req.file) {
    throw new CustomError("message content (text or image) is required", 400);
  }

  if (req.file) {
    PicUrl = (await uploadCareClient(req.file.path)) || undefined;
  }

  const messageData = {
    gid,
    content,
    parentId,
    PicUrl,
  };

  const message = await sendGroupMessage(currentUserId, messageData);

  res.status(200).json(message);
};

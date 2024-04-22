import { Request, Response, NextFunction } from "express";
import { CustomError } from "../../utils/customErrors";
import { verifyToken } from "../../utils/verifyToken";
import { DecodedData, authenticatedRequest } from "../middleware.types";
import { getUser } from "../../services/users/getUser";
import { getChats } from "../../services/chats/getChats";
import { getMembers } from "../../services/groups/getMembers";

export const verifyParticipant = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const decodedData = verifyToken(req.headers.authorization) as DecodedData;

  const user = await getUser(decodedData.userId);

  if (!user.id) {
    throw new CustomError("invalid token payload", 401);
  }

  if (req.params.cid) {
    const chats = await getChats(decodedData.userId);
    const chat = chats.filter((c) => c.chat_id == req.params.cid);
    if (!chat.length) {
      throw new CustomError("user Unauthorized!", 401);
    }
  }

  if (req.params.gid) {
    const members = await getMembers(req.params.gid);
    const member = members.filter(
      (m) => m.user_id == decodedData.userId && m.status != "PENDING"
    );
    if (!member.length) {
      throw new CustomError("user Unauthorized!", 401);
    }
  }

  (req as authenticatedRequest).userId = decodedData.userId;
  (req as authenticatedRequest).username = decodedData.username;
  (req as authenticatedRequest).userRole = decodedData.role;

  next();
};

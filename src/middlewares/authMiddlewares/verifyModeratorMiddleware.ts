import { Request, Response, NextFunction } from "express";
import { CustomError } from "../../utils/customErrors";
import { verifyToken } from "../../utils/verifyToken";
import { DecodedData, authenticatedRequest } from "../middleware.types";
import { getUser } from "../../services/users/getUser";
import { getGroups } from "../../services/groups/getGroups";

export const verifyModerator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const decodedData = verifyToken(req.headers.authorization) as DecodedData;

  const user = await getUser(decodedData.id);

  if (!user.id) {
    throw new CustomError("invalid token payload", 401);
  }

  const groups = await getGroups();
  const group = groups.filter((g) => g.id == req.params.gid);
  if (group.length && group[0].moderator.user_id != decodedData.id) {
    throw new CustomError("user Unauthorized", 401);
  }

  (req as authenticatedRequest).userId = decodedData.id;
  (req as authenticatedRequest).username = decodedData.username;
  (req as authenticatedRequest).userRole = decodedData.role;

  next();
};

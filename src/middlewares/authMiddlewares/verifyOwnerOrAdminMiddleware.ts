import { Request, Response, NextFunction } from "express";
import { CustomError } from "../../utils/customErrors";
import { verifyToken } from "../../utils/verifyToken";
import { DecodedData, authenticatedRequest } from "../middleware.types";
import { getUser } from "../../services/users/getUser";
import { getGroups } from "../../services/groups/getGroups";

export const verifyOwnerOrAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const decodedData = verifyToken(req.headers.authorization) as DecodedData;

  const user = await getUser(decodedData.userId);

  if (!user.id) {
    throw new CustomError("invalid token payload", 401);
  }

  if (req.params.uid) {
    if (decodedData?.userId != req.params.id && decodedData.role !== "ADMIN") {
      throw new CustomError("user Unauthorized!", 401);
    }
  }

  //check if moderator
  if (req.params.gid && !req.params.uid) {
    const groups = await getGroups();
    const group = groups.filter((g) => g.id == req.params.gid);
    if (
      group.length &&
      group[0].moderator.user_id != decodedData.userId &&
      decodedData.role !== "ADMIN"
    ) {
      throw new CustomError("user Unauthorized", 401);
    }
  }

  (req as authenticatedRequest).userId = decodedData.userId;
  (req as authenticatedRequest).username = decodedData.username;
  (req as authenticatedRequest).userRole = decodedData.role;

  next();
};

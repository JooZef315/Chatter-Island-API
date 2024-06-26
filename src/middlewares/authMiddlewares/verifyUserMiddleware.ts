import { Request, Response, NextFunction } from "express";
import { CustomError } from "../../utils/customErrors";
import { verifyToken } from "../../utils/verifyToken";
import { getUser } from "../../services/users/getUser";
import { DecodedData, authenticatedRequest } from "../middleware.types";

export const verifyUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const decodedData = verifyToken(req.headers.authorization) as DecodedData;

  const user = await getUser(decodedData.userId);

  if (!user.id) {
    throw new CustomError("invalid token payload", 401);
  }

  (req as authenticatedRequest).userId = decodedData.userId;
  (req as authenticatedRequest).username = decodedData.username;
  (req as authenticatedRequest).userRole = decodedData.role;

  next();
};

import { Request, Response, NextFunction } from "express";
import { JwtPayload } from "jsonwebtoken";
import { CustomError } from "../../utils/customErrors";
import { verifyToken } from "../../utils/verifyToken";
import { getUser } from "../../services/users/getUser";

type DecodedData = JwtPayload & {
  id: string;
  username: string;
  role: string;
};

type authenticatedRequest = Request & DecodedData;

export const verifyUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const decodedData = verifyToken(req.headers.authorization) as DecodedData;

  const user: any = await getUser(decodedData.id);

  if (!user.id) {
    throw new CustomError("invalid token payload", 401);
  }

  (req as authenticatedRequest).userId = decodedData.id;
  (req as authenticatedRequest).username = decodedData.username;
  (req as authenticatedRequest).userRole = decodedData.role;

  next();
};

import { Request, Response, NextFunction } from "express";
import { JwtPayload } from "jsonwebtoken";
import { CustomError } from "../../utils/customErrors";
import { verifyToken } from "../../utils/verifyToken";
// import { getUser } from "../../services/users/getUser";

type DecodedData = JwtPayload & {
  id: string;
  username: string;
  role: string;
};

type authenticatedRequest = Request & DecodedData;

export const verifyAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const decodedData = verifyToken(req.headers.authorization) as DecodedData;

  const user = {};

  if (!user) {
    throw new CustomError("user not found", 404);
  }

  if (decodedData.role !== "admin") {
    throw new CustomError("user Unauthorized", 401);
  }

  (req as authenticatedRequest).userId = decodedData.id;
  (req as authenticatedRequest).username = decodedData.username;
  (req as authenticatedRequest).userRole = decodedData.role;

  next();
};

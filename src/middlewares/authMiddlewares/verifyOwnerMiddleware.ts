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

export const verifyOwner = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const decodedData = verifyToken(req.headers.authorization) as DecodedData;

  const user = {};

  if (!user) {
    throw new CustomError("user not found", 404);
  }

  if (req.params.id && decodedData?.id != req.params.id) {
    throw new CustomError("user Unauthorized", 401);
  }

  if (req.params.cid) {
    const comment: any = {};
    if (!comment.userId?._id.equals(decodedData.id)) {
      throw new CustomError("user Unauthorized", 401);
    }
  }

  if (req.params.bid && !req.params.cid) {
    const blog: any = {};
    if (!blog.author?._id.equals(decodedData.id)) {
      throw new CustomError("user Unauthorized", 401);
    }
  }

  (req as authenticatedRequest).userId = decodedData.id;
  (req as authenticatedRequest).username = decodedData.username;
  (req as authenticatedRequest).userRole = decodedData.role;

  next();
};

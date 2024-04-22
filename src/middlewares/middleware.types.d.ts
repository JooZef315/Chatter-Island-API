import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export type DecodedData = JwtPayload & {
  id: string;
  username: string;
  role: string;
};

export type authenticatedRequest = Request & DecodedData;

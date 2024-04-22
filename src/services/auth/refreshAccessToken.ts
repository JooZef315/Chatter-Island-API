import jwt, { JwtPayload } from "jsonwebtoken";
import { CustomError } from "../../utils/customErrors";
import { getUser } from "../users/getUser";

type RefreshPyload = JwtPayload & {
  id: string;
};

const ACCESS_TOKEN_SECRET =
  process.env.ACCESS_TOKEN_SECRET || "ACCESS_TOKEN_SECRET";
const REFRESH_TOKEN_SECRET =
  process.env.REFRESH_TOKEN_SECRET || "REFRESH_TOKEN_SECRET";

export const refreshAccessToken = async (refreshToken: string) => {
  console.log(refreshToken);
  if (!refreshToken) {
    throw new CustomError("invalid token", 401);
  }
  try {
    const payload = jwt.verify(
      refreshToken,
      REFRESH_TOKEN_SECRET
    ) as RefreshPyload;

    const user: any = await getUser(payload.id);

    if (!user.id) {
      throw new CustomError("Unauthorized user", 401);
    }

    const accessToken = jwt.sign(
      {
        id: user.id,
        username: user.username,
        role: user.role,
      },
      ACCESS_TOKEN_SECRET,
      {
        expiresIn: "2m",
      }
    );

    return accessToken;
  } catch (error: any) {
    console.log(error.message);
    throw new CustomError(error.message, 401);
  }
};

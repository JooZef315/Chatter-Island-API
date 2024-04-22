import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { CustomError } from "../../utils/customErrors";
import { db } from "../../config/DB";
import { users } from "../../drizzle/schema";
import { eq } from "drizzle-orm";

const ACCESS_TOKEN_SECRET =
  process.env.ACCESS_TOKEN_SECRET || "ACCESS_TOKEN_SECRET";
const REFRESH_TOKEN_SECRET =
  process.env.REFRESH_TOKEN_SECRET || "REFRESH_TOKEN_SECRET";

export const logIn = async (username: string, password: string) => {
  const user = await db
    .select({
      id: users.id,
      username: users.username,
      role: users.role,
      password: users.password,
    })
    .from(users)
    .where(eq(users.username, username));

  if (!user.length) {
    throw new CustomError("wrong username or passowrd", 401);
  }

  const passwordMatches = await bcrypt.compare(password, user[0].password);

  if (!passwordMatches) {
    throw new CustomError("wrong username or passowrd", 401);
  }

  const accessToken = jwt.sign(
    {
      userId: user[0].id,
      username: user[0].username,
      role: user[0].role,
    },
    ACCESS_TOKEN_SECRET,
    {
      expiresIn: "15m",
    }
  );

  const refreshToken = jwt.sign(
    {
      id: user[0].id,
    },
    REFRESH_TOKEN_SECRET,
    {
      expiresIn: "7d",
    }
  );

  return { accessToken, refreshToken };
};

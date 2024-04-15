import bcrypt from "bcryptjs";
import { CustomError } from "../../utils/customErrors";
import { TUser } from "../../validators/zodTypes";
import { db } from "../../config/DB";
import { users } from "../../drizzle/schema";
import { eq } from "drizzle-orm";

export const createUser = async (userData: TUser) => {
  const existedUser = await db
    .select()
    .from(users)
    .where(eq(users.username, userData.username));

  if (existedUser.length) {
    throw new CustomError("user already exists!", 400);
  }
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  const profilePicUrl = userData.profilePicUrl
    ? userData.profilePicUrl
    : "https://ucarecdn.com/9bc39a33-5800-4f7f-b246-93e4ccefcdab/profilePic.png";

  const newUser = await db
    .insert(users)
    .values({
      username: userData.username,
      password: hashedPassword,
      bio: userData.bio,
      profilePicUrl: profilePicUrl,
    })
    .returning();

  return newUser[0];
};

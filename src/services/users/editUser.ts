import bcrypt from "bcryptjs";
import { db } from "../../config/DB";
import { and, eq, ne } from "drizzle-orm";
import { users } from "../../drizzle/schema";
import { CustomError } from "../../utils/customErrors";
import { TUser } from "../../validators/zodTypes";

export const editUser = async (
  id: string,
  currentUserId: string,
  userData: TUser
) => {
  const user = await db.select().from(users).where(eq(users.id, id));

  if (!user.length) {
    throw new CustomError("user not found", 404);
  }

  if (currentUserId != id) {
    throw new CustomError("user Unauthorized!", 401);
  }

  const existedWithSameUsername = await db
    .select()
    .from(users)
    .where(and(eq(users.username, userData.username), ne(users.id, id)));

  if (existedWithSameUsername.length) {
    throw new CustomError("username already taken", 400);
  }

  const newHashedPassword = await bcrypt.hash(userData.password, 10);
  const newProfilePicUrl = userData.profilePicUrl || user[0].profilePicUrl;

  const updatedUser = await db
    .update(users)
    .set({
      username: userData.username,
      password: newHashedPassword,
      profilePicUrl: newProfilePicUrl,
    })
    .where(eq(users.id, id))
    .returning();

  return updatedUser;
};

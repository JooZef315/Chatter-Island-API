import { eq } from "drizzle-orm";
import { db } from "../../config/DB";
import { users } from "../../drizzle/schema";
import { CustomError } from "../../utils/customErrors";

export const getUser = async (id: string) => {
  const user = await db
    .select({
      id: users.id,
      usernam: users.username,
      bio: users.bio,
      profilePic: users.profilePicUrl,
      role: users.role,
      joined_at: users.created_at,
    })
    .from(users)
    .where(eq(users.id, id));

  console.log(user);
  if (!user.length) {
    throw new CustomError("user not found", 404);
  }

  return user[0];
};

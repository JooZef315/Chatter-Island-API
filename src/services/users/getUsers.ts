import { db } from "../../config/DB";
import { users } from "../../drizzle/schema";

export const getUsers = async () => {
  const data = await db
    .select({
      id: users.id,
      usernam: users.username,
      profilePic: users.profilePicUrl,
      role: users.role,
    })
    .from(users);
  return data;
};

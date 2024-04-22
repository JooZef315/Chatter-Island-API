import { db } from "../../config/DB";
import { users } from "../../drizzle/schema";

export const getUsers = async (search: string) => {
  let data = await db
    .select({
      id: users.id,
      username: users.username,
      profilePic: users.profilePicUrl,
      role: users.role,
    })
    .from(users);

  if (search) {
    data = data.filter((user) => user.username.includes(search));
  }
  return data;
};

import { eq } from "drizzle-orm";
import { db } from "../../config/DB";
import { users, members, groups } from "../../drizzle/schema";

export const getMembers = async (id: string) => {
  const GroupMembers = await db
    .select({
      id: members.id,
      user_id: users.id,
      username: users.username,
      profilePic: users.profilePicUrl,
      status: members.status,
    })
    .from(members)
    .where(eq(members.groupId, id))
    .innerJoin(users, eq(users.id, members.userId));

  if (!GroupMembers.length) {
    return [];
  }

  return GroupMembers;
};

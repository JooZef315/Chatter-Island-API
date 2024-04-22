import { and, count, eq, or } from "drizzle-orm";
import { db } from "../../config/DB";
import { users, groups, members } from "../../drizzle/schema";

export const getGroups = async () => {
  const allGroups = await db
    .select({
      id: groups.id,
      name: groups.name,
      description: groups.description,
      moderator: {
        user_id: users.id,
        username: users.username,
        profilePic: users.profilePicUrl,
      },
      capacity: groups.capacity,
      membersCount: count(members.userId),
    })
    .from(groups)
    .innerJoin(users, eq(groups.moderator, users.id))
    .innerJoin(
      members,
      and(
        eq(groups.id, members.groupId),
        or(eq(members.status, "JOINED"), eq(members.status, "MODERATOR"))
      )
    )
    .groupBy(groups.id, users.id);

  if (!allGroups.length) {
    return [];
  }

  return allGroups;
};

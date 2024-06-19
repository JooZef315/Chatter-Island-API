import { count, eq, or } from "drizzle-orm";
import { db } from "../../config/DB";
import { friends, groups, users } from "../../drizzle/schema";
import { CustomError } from "../../utils/customErrors";
import { alias } from "drizzle-orm/pg-core";

export const getUser = async (id: string) => {
  const userAlias = alias(friends, "userAlias");
  const user = await db
    .select({
      id: users.id,
      username: users.username,
      bio: users.bio,
      profilePic: users.profilePicUrl,
      role: users.role,
      moderator_at: {
        id: groups.id,
        name: groups.name,
      },
      friends_count: count(userAlias.id),
      joined_at: users.created_at,
    })
    .from(users)
    .where(eq(users.id, id))
    .leftJoin(
      userAlias,
      or(eq(users.id, userAlias.user1), eq(users.id, userAlias.user2))
    )
    .leftJoin(groups, eq(users.id, groups.moderator))
    .groupBy(users.id, groups.id, groups.name);

  if (!user.length) {
    throw new CustomError("user not found", 404);
  }

  // nest the moderated groups of the user
  const moderatedGroups: ({ id: string; name: string } | null)[] = [];
  user.forEach((u) => moderatedGroups.push(u.moderator_at));

  return { ...user[0], moderator_at: moderatedGroups };
};

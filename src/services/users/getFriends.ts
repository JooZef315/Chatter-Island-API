import { and, eq, ne, or } from "drizzle-orm";
import { db } from "../../config/DB";
import { users, friends } from "../../drizzle/schema";
import { alias } from "drizzle-orm/pg-core";

export const getFriends = async (id: string) => {
  const friendAlias = alias(users, "friendAlias");
  const userFriends = await db
    .select({
      friend_id: friendAlias.id,
      friend_username: friendAlias.username,
      statue: friends.status,
    })
    .from(users)
    .leftJoin(
      friends,
      or(eq(users.id, friends.user1), eq(users.id, friends.user2))
    )
    .leftJoin(
      friendAlias,
      or(eq(friends.user1, friendAlias.id), eq(friends.user2, friendAlias.id))
    )
    .where(and(eq(users.id, id), ne(users.username, friendAlias.username)));

  if (!userFriends.length) {
    return [];
  }

  return userFriends;
};

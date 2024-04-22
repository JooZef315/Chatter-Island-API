import { and, eq, ne, or } from "drizzle-orm";
import { db } from "../../config/DB";
import { users, friends } from "../../drizzle/schema";
import { alias } from "drizzle-orm/pg-core";
import { CustomError } from "../../utils/customErrors";

export const getFriends = async (id: string, currentUserId: string) => {
  const isFriends = await db
    .select()
    .from(friends)
    .where(
      or(
        and(
          eq(friends.user1, id),
          eq(friends.user2, currentUserId),
          eq(friends.status, "FRIENDS")
        ),
        and(
          eq(friends.user1, currentUserId),
          eq(friends.user2, id),
          eq(friends.status, "FRIENDS")
        ),
        eq(currentUserId as any, id)
      )
    );

  if (!isFriends.length) {
    throw new CustomError("Unauthorized! only friends are authorized", 401);
  }

  const friendAlias = alias(users, "friendAlias");
  const userFriends = await db
    .select({
      friend_id: friendAlias.id,
      friend_username: friendAlias.username,
      friend_profilePic: friendAlias.profilePicUrl,
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

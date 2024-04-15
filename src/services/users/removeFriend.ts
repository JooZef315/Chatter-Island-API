import { db } from "../../config/DB";
import { friends, users } from "../../drizzle/schema";
import { and, eq, or } from "drizzle-orm";
import { CustomError } from "../../utils/customErrors";

export const removeFriend = async (id: string, currentUserId: string) => {
  const user = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.id, id));
  const currentUser = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.id, currentUserId));

  if (!user.length || !currentUser.length) {
    throw new CustomError("id/ids not vaild", 400);
  }

  if (id == currentUserId) {
    throw new CustomError("any friends action with yourself not allowed", 403);
  }

  const friendShip = await db
    .select()
    .from(friends)
    .where(
      or(
        and(eq(friends.user1, id), eq(friends.user2, currentUserId)),
        and(eq(friends.user1, currentUserId), eq(friends.user2, id))
      )
    );
  if (!friendShip.length) {
    throw new CustomError("No friendShip exists", 400);
  }

  await db
    .delete(friends)
    .where(
      or(
        and(eq(friends.user1, id), eq(friends.user2, currentUserId)),
        and(eq(friends.user1, currentUserId), eq(friends.user2, id))
      )
    );
};

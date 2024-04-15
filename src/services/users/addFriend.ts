import { db } from "../../config/DB";
import { friends, users } from "../../drizzle/schema";
import { and, eq } from "drizzle-orm";
import { CustomError } from "../../utils/customErrors";

export const addFriend = async (id: string, currentUserId: string) => {
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
    throw new CustomError(
      "sending a friend request to yourself not allowed",
      403
    );
  }

  const existedFriendShip = await db
    .select()
    .from(friends)
    .where(and(eq(friends.user1, id), eq(friends.user2, currentUserId)));

  if (existedFriendShip.length) {
    throw new CustomError("friendShip already exists!", 400);
  }

  await db.insert(friends).values({
    user1: currentUserId,
    user2: id,
  });
};

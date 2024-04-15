import { db } from "../../config/DB";
import { friends, users } from "../../drizzle/schema";
import { and, eq } from "drizzle-orm";
import { CustomError } from "../../utils/customErrors";

export const confirmFriend = async (id: string, currentUserId: string) => {
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
    throw new CustomError("friend request to yourself not allowed", 403);
  }

  const existedFriendShip = await db
    .select()
    .from(friends)
    .where(and(eq(friends.user1, currentUserId), eq(friends.user2, id)));

  if (existedFriendShip.length) {
    throw new CustomError(
      `friendShip already exists!, you are ${existedFriendShip[0].status}`,
      403
    );
  }

  const FriendShip = await db
    .select()
    .from(friends)
    .where(and(eq(friends.user1, id), eq(friends.user2, currentUserId)));

  if (!FriendShip.length) {
    throw new CustomError(
      "No friendShip exists, please send him a new friend request",
      403
    );
  }

  if (FriendShip[0].status == "FRIENDS") {
    throw new CustomError(" Already Friends!", 400);
  }

  await db
    .update(friends)
    .set({ status: "FRIENDS" })
    .where(and(eq(friends.user1, id), eq(friends.user2, currentUserId)));
};

import { eq, or } from "drizzle-orm";
import { db } from "../../config/DB";
import { users, friends } from "../../drizzle/schema";
import { CustomError } from "../../utils/customErrors";
import { alias } from "drizzle-orm/pg-core";

export const getFriends = async (id: string) => {
  const friendAlias = alias(users, "friendAlias");
  const user = await db
    .select({
      user: users.username,
      friends,
      friendAlias: {
        user: friendAlias.username,
      },
    })
    .from(users)
    .leftJoin(
      friends,
      or(eq(users.id, friends.user1), eq(users.id, friends.user2))
    )
    .leftJoin(
      friendAlias,
      or(eq(friends.user1, friendAlias.id), eq(friends.user2, friendAlias.id))
    );

  // .where(eq(users.id, id));

  //   console.log(user)
  if (!user.length) {
    throw new CustomError("user not found", 404);
  }

  return user;
};

import { and, eq, ne, or } from "drizzle-orm";
import { db } from "../../config/DB";
import { users, chats } from "../../drizzle/schema";
import { alias } from "drizzle-orm/pg-core";

export const getChats = async (currentUserId: string) => {
  const usersAlias = alias(users, "usersAlias");
  const UserChats = await db
    .select({
      chat_id: chats.id,
      friend_id: usersAlias.id,
      friend_username: usersAlias.username,
    })
    .from(users)
    .leftJoin(chats, or(eq(users.id, chats.user1), eq(users.id, chats.user2)))
    .leftJoin(
      usersAlias,
      or(eq(chats.user1, usersAlias.id), eq(chats.user2, usersAlias.id))
    )
    .where(
      and(eq(users.id, currentUserId), ne(users.username, usersAlias.username))
    );

  if (!UserChats.length) {
    return [];
  }

  return UserChats;
};

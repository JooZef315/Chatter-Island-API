import { db } from "../../config/DB";
import { chats, users } from "../../drizzle/schema";
import { and, eq, or } from "drizzle-orm";
import { CustomError } from "../../utils/customErrors";

export const deleteChat = async (id1: string, id2: string) => {
  const user1 = await db.select().from(users).where(eq(users.id, id1));
  const user2 = await db.select().from(users).where(eq(users.id, id2));

  if (id1 == id2) {
    throw new CustomError("chatting with yourself not allowed", 403);
  }

  if (!user1.length || !user2.length) {
    throw new CustomError("user not found", 404);
  }

  const existedChat = await db
    .select()
    .from(chats)
    .where(
      or(
        and(eq(chats.user1, id1), eq(chats.user2, id2)),
        and(eq(chats.user1, id2), eq(chats.user2, id1))
      )
    );

  if (!existedChat.length) {
    throw new CustomError("chat not found", 404);
  }

  await db
    .delete(chats)
    .where(
      or(
        and(eq(chats.user1, id1), eq(chats.user2, id2)),
        and(eq(chats.user1, id2), eq(chats.user2, id1))
      )
    );
};

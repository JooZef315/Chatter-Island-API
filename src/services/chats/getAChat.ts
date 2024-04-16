import { count, desc, eq } from "drizzle-orm";
import { db } from "../../config/DB";
import { users, messages } from "../../drizzle/schema";
import { alias } from "drizzle-orm/pg-core";
import { CustomError } from "../../utils/customErrors";

export const getAChat = async (
  cid: string,
  page: number,
  MESSAGES_PER_PAGE: number
) => {
  const messagesCount = await db
    .select({ count: count(users.id) })
    .from(messages)
    .where(eq(messages.chatId, cid));

  const totalMessagesCount = messagesCount[0].count;
  const totalPagesCount = Math.ceil(totalMessagesCount / MESSAGES_PER_PAGE);

  if (page > totalPagesCount && totalPagesCount > 0) {
    throw new CustomError(
      `only pages between 1 and ${totalPagesCount} allowed`,
      400
    );
  }

  const messagesAlias = alias(messages, "messagesAlias");

  const chatMessages = await db
    .select({
      id: messages.id,
      message: messages.content,
      sender: {
        sender_id: users.id,
        sender_username: users.username,
        profilePic: users.profilePicUrl,
      },
      parent: {
        parent_message_id: messagesAlias.id,
        parent_message: messagesAlias.content,
      },
    })
    .from(messages)
    .where(eq(messages.chatId, cid))
    .innerJoin(users, eq(users.id, messages.senderId))
    .leftJoin(messagesAlias, eq(messages.parentId, messagesAlias.id))
    .orderBy(desc(messages.sent_at))
    .limit(MESSAGES_PER_PAGE)
    .offset((page - 1) * MESSAGES_PER_PAGE);

  return chatMessages;
};

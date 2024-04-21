import { count, desc, eq } from "drizzle-orm";
import { db } from "../../config/DB";
import { users, groupMessages } from "../../drizzle/schema";
import { alias } from "drizzle-orm/pg-core";
import { CustomError } from "../../utils/customErrors";

export const getAGroupChat = async (
  gid: string,
  page: number,
  MESSAGES_PER_PAGE: number
) => {
  const messagesCount = await db
    .select({ count: count(users.id) })
    .from(groupMessages)
    .where(eq(groupMessages.groupId, gid));

  const totalMessagesCount = messagesCount[0].count;
  const totalPagesCount = Math.ceil(totalMessagesCount / MESSAGES_PER_PAGE);

  if (page > totalPagesCount && totalPagesCount > 0) {
    throw new CustomError(
      `only pages between 1 and ${totalPagesCount} allowed`,
      400
    );
  }

  const groupMessagesAlias = alias(groupMessages, "messagesAlias");

  const gMessages = await db
    .select({
      id: groupMessages.id,
      message: groupMessages.content,
      sender: {
        sender_id: users.id,
        sender_username: users.username,
        profilePic: users.profilePicUrl,
      },
      parent: {
        parent_message_id: groupMessagesAlias.id,
        parent_message: groupMessagesAlias.content,
      },
    })
    .from(groupMessages)
    .where(eq(groupMessages.groupId, gid))
    .innerJoin(users, eq(users.id, groupMessages.senderId))
    .leftJoin(
      groupMessagesAlias,
      eq(groupMessages.parentId, groupMessagesAlias.id)
    )
    .orderBy(desc(groupMessages.sent_at))
    .limit(MESSAGES_PER_PAGE)
    .offset((page - 1) * MESSAGES_PER_PAGE);

  return gMessages;
};

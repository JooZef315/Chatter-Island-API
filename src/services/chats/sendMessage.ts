import { CustomError } from "../../utils/customErrors";
import { db } from "../../config/DB";
import { chats, messages, users } from "../../drizzle/schema";
import { and, eq } from "drizzle-orm";

type Params = {
  cid: string;
  content: string;
  parentId: string;
  PicUrl: string | undefined;
};
export const sendMessage = async (
  currentUserId: string,
  { cid, content, parentId, PicUrl }: Params
) => {
  const sender = await db
    .select()
    .from(users)
    .where(eq(users.id, currentUserId));

  const chat = await db.select().from(chats).where(eq(chats.id, cid));

  if (!sender.length || !chat.length) {
    throw new CustomError("user OR chat not found", 404);
  }

  if (chat[0].user1 != currentUserId && chat[0].user2 != currentUserId) {
    throw new CustomError("user is Unauthorized!", 401);
  }

  if (parentId) {
    const parent = await db
      .select()
      .from(messages)
      .where(and(eq(messages.id, parentId), eq(messages.chatId, chat[0].id)));
    if (!parent.length) {
      throw new CustomError("parentId not valid", 400);
    }
  }

  const newMessage = await db
    .insert(messages)
    .values({
      senderId: currentUserId,
      chatId: cid,
      content: PicUrl || content,
      parentId: parentId || null,
    })
    .returning();

  return newMessage[0];
};

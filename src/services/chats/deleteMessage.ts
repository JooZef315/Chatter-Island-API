import { db } from "../../config/DB";
import { chats, messages } from "../../drizzle/schema";
import { eq } from "drizzle-orm";
import { CustomError } from "../../utils/customErrors";

export const deleteMessage = async (
  currentUserId: string,
  cid: string,
  mid: string
) => {
  const chat = await db.select().from(chats).where(eq(chats.id, cid));
  const message = await db.select().from(messages).where(eq(messages.id, mid));

  if (!message.length) {
    throw new CustomError("message not found", 404);
  }

  if (chat[0].id != message[0].chatId) {
    throw new CustomError("chatID not valid", 400);
  }

  if (currentUserId != message[0].senderId) {
    throw new CustomError(
      "user is authorized to delete only his own messages",
      401
    );
  }

  await db.delete(messages).where(eq(messages.id, mid));
};

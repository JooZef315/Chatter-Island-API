import { and, desc, eq, ne, or } from "drizzle-orm";
import { db } from "../../config/DB";
import { users, chats, messages } from "../../drizzle/schema";
import { alias } from "drizzle-orm/pg-core";

export const getChats = async (currentUserId: string) => {
  const usersAlias = alias(users, "usersAlias");

  const userChats = await db
    .select({
      chat_id: chats.id,
      friend: {
        friend_id: usersAlias.id,
        friend_username: usersAlias.username,
        friend_profilePic: usersAlias.profilePicUrl,
      },
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

  if (!userChats.length) {
    return [];
  }

  let lastMassagesP: any[] = [];

  userChats.forEach(async (u) => {
    const m = db
      .select({
        chat_id: messages.chatId,
        sender: messages.senderId,
        message: messages.content,
        sent_at: messages.sent_at,
      })
      .from(messages)
      .where(eq(messages.chatId, u.chat_id as string))
      .orderBy(desc(messages.sent_at))
      .limit(1);
    lastMassagesP.push(m);
  });
  const resolveResults = await Promise.all(lastMassagesP);
  const lastMassages: {
    chat_id: string;
    sender: string;
    message: string;
    sent_at: Date;
  }[] = resolveResults.map((m) => {
    return (m = m.length ? m[0] : null);
  });

  //full chats with last messages
  const fullChats: any = userChats.map((c) => {
    const last_message = lastMassages.filter((m) => {
      return m?.chat_id == c.chat_id;
    });
    return {
      ...c,
      last_message: last_message.length
        ? {
            sender:
              last_message[0].sender == c.friend?.friend_id
                ? c.friend?.friend_username
                : "You",
            message: last_message[0].message,
            sent_at: last_message[0].sent_at,
          }
        : null,
    };
  });

  return fullChats;
};

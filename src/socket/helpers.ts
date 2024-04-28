import { Socket } from "socket.io";
import { db } from "../config/DB";
import { chats, members, messages } from "../drizzle/schema";
import { Msg, User } from "./socket.types";
import { eq, or } from "drizzle-orm";
import { sendMessage } from "../services/chats/sendMessage";
import { sendGroupMessage } from "../services/groups/sendGroupMessage";

export const addUserToOnline = (
  sockedId: string,
  userId: string,
  onlineUsers: User[]
) => {
  const onlineExestied = onlineUsers.filter((u) => u.userId == userId);
  if (!onlineExestied.length) {
    onlineUsers.push({
      sockedId,
      userId,
    });
    console.log("a user online: ", userId);
  }
};

export const addUserToHisRooms = async (socket: Socket, userId: string) => {
  const chatsList = await db
    .select()
    .from(chats)
    .where(or(eq(chats.user1, userId), eq(chats.user2, userId)));
  const groupsList = await db
    .select({ id: members.groupId })
    .from(members)
    .where(eq(members.userId, userId));
  console.log(chatsList);
  console.log(groupsList);

  chatsList.forEach((c) => {
    socket.join(c.id);
  });
  groupsList.forEach((g) => {
    socket.join(g.id);
  });
};

export const saveMessageToDb = async (message: Msg) => {
  if (message.type == "chat") {
    await sendMessage(message.userId, {
      cid: message.roomId,
      content: message.message,
      parentId: message.parentId,
      PicUrl: undefined,
    });
  } else {
    await sendGroupMessage(message.userId, {
      gid: message.roomId,
      content: message.message,
      parentId: message.parentId,
      PicUrl: undefined,
    });
  }
};

export const removeUserFromOnline = (socketId: string, onlineUsers: User[]) => {
  const idx = onlineUsers.findIndex((u) => u.sockedId == socketId);
  onlineUsers.splice(idx, 1);
};

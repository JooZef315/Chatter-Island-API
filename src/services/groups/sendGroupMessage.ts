import { CustomError } from "../../utils/customErrors";
import { db } from "../../config/DB";
import { users, groupMessages, groups, members } from "../../drizzle/schema";
import { and, eq, ne } from "drizzle-orm";

type Params = {
  gid: string;
  content: string;
  parentId: string;
  profilePicUrl: string | undefined;
};
export const sendGroupMessage = async (
  currentUserId: string,
  { gid, content, parentId, profilePicUrl }: Params
) => {
  const sender = await db
    .select()
    .from(users)
    .where(eq(users.id, currentUserId));

  const group = await db.select().from(groups).where(eq(groups.id, gid));

  if (!sender.length || !group.length) {
    throw new CustomError("user OR group chat not found", 404);
  }

  if (parentId) {
    const parent = await db
      .select()
      .from(groupMessages)
      .where(
        and(
          eq(groupMessages.id, parentId),
          eq(groupMessages.groupId, group[0].id)
        )
      );
    if (!parent.length) {
      throw new CustomError("parentId not valid", 400);
    }
  }

  const newMessage = await db
    .insert(groupMessages)
    .values({
      senderId: currentUserId,
      groupId: gid,
      content: profilePicUrl || content,
      parentId: parentId || null,
    })
    .returning();

  return newMessage[0];
};

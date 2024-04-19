import { db } from "../../config/DB";
import { groups, members, users } from "../../drizzle/schema";
import { and, eq } from "drizzle-orm";
import { CustomError } from "../../utils/customErrors";

export const joinGroup = async (id: string, currentUserId: string) => {
  const group = await db.select().from(groups).where(eq(groups.id, id));
  const currentUser = await db
    .select()
    .from(users)
    .where(eq(users.id, currentUserId));

  if (!group.length || !currentUser.length) {
    throw new CustomError("id/ids not vaild", 400);
  }

  if (group[0].moderator == currentUserId) {
    throw new CustomError("moderator already in the group!", 400);
  }

  const existedJoinRequest = await db
    .select()
    .from(members)
    .where(and(eq(members.userId, currentUserId), eq(members.groupId, id)));

  if (existedJoinRequest.length) {
    throw new CustomError("join request already sent!", 400);
  }

  await db.insert(members).values({
    groupId: group[0].id,
    userId: currentUser[0].id,
  });
};

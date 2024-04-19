import { db } from "../../config/DB";
import { groups, members, users } from "../../drizzle/schema";
import { and, eq, ne } from "drizzle-orm";
import { CustomError } from "../../utils/customErrors";

export const removeMember = async (
  gid: string,
  uid: string,
  currentUserId: string
) => {
  const group = await db.select().from(groups).where(eq(groups.id, gid));
  const user = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.id, uid));
  const currentUser = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.id, currentUserId));

  if (!group.length || !user.length || !currentUser.length) {
    throw new CustomError("id/ids not vaild", 400);
  }

  const existedMembership = await db
    .select()
    .from(members)
    .where(and(eq(members.userId, uid), eq(members.groupId, gid)));

  if (!existedMembership.length) {
    throw new CustomError("the user has no requests!", 400);
  }

  if (
    group[0].moderator != currentUserId &&
    existedMembership[0].userId != currentUserId
  ) {
    throw new CustomError("unAuth!", 401);
  }

  if (existedMembership[0].status == "MODERATOR") {
    throw new CustomError("it is not valid to remove the MODERATOR", 403);
  }

  await db
    .delete(members)
    .where(and(eq(members.userId, uid), eq(members.groupId, gid)));
};

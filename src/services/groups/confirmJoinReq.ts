import { db } from "../../config/DB";
import { groups, members, users } from "../../drizzle/schema";
import { and, eq, ne } from "drizzle-orm";
import { CustomError } from "../../utils/customErrors";

export const confirmJoinReq = async (
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

  if (existedMembership[0].status != "PENDING") {
    throw new CustomError(
      "the Membership you are confirming is not a pending Membership",
      403
    );
  }

  const joinedMembers = await db
    .select({ id: members.id })
    .from(members)
    .where(and(eq(members.groupId, gid), ne(members.status, "PENDING")));

  if (joinedMembers.length >= group[0].capacity) {
    throw new CustomError("the group is full right now!", 403);
  }

  await db
    .update(members)
    .set({ status: "JOINED" })
    .where(and(eq(members.userId, uid), eq(members.groupId, gid)));
};

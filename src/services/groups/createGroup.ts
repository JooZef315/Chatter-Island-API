import { db } from "../../config/DB";
import { groups, members, users } from "../../drizzle/schema";
import { eq } from "drizzle-orm";
import { TGroup } from "../../validators/zodTypes";
import { CustomError } from "../../utils/customErrors";

export const createGroup = async (groupData: TGroup, currentUserId: string) => {
  const user = await db.select().from(users).where(eq(users.id, currentUserId));

  if (!user.length) {
    throw new CustomError("userId not found", 404);
  }

  const existedGroup = await db
    .select()
    .from(groups)
    .where(eq(groups.name, groupData.name));

  if (existedGroup.length) {
    throw new CustomError("group name already taken!", 400);
  }

  const description =
    groupData.description.trim().length > 0
      ? groupData.description.trim()
      : "this is a new group chat on chatter island!";

  const newGroup = await db
    .insert(groups)
    .values({
      name: groupData.name,
      description,
      capacity: groupData.capacity,
      moderator: currentUserId,
    })
    .returning();

  await db.insert(members).values({
    groupId: newGroup[0].id,
    userId: currentUserId,
    status: "MODERATOR",
  });

  return newGroup[0];
};

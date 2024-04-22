import { db } from "../../config/DB";
import { groups, users } from "../../drizzle/schema";
import { and, eq, ne } from "drizzle-orm";
import { TGroup } from "../../validators/zodTypes";
import { CustomError } from "../../utils/customErrors";

export const editGroup = async (id: string, groupData: TGroup) => {
  const group = await db.select().from(groups).where(eq(groups.id, id));

  if (!group.length) {
    throw new CustomError("gid not valid", 400);
  }

  const existedGroupWithSameName = await db
    .select()
    .from(groups)
    .where(and(eq(groups.name, groupData.name), ne(groups.id, id)));

  if (existedGroupWithSameName.length) {
    throw new CustomError("name already taken!", 400);
  }

  const newDescription =
    groupData.description.trim().length > 0
      ? groupData.description.trim()
      : "this is a new group chat on chatter island!";

  const updatedGroup = await db
    .update(groups)
    .set({
      name: groupData.name,
      description: newDescription,
      capacity: groupData.capacity,
    })
    .where(eq(groups.id, id))
    .returning();

  return updatedGroup[0];
};

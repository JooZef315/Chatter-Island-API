import { db } from "../../config/DB";
import { groups } from "../../drizzle/schema";
import { eq } from "drizzle-orm";
import { CustomError } from "../../utils/customErrors";

export const deleteGroup = async (id: string, currentUserId: string) => {
  const group = await db.select().from(groups).where(eq(groups.id, id));

  if (!group.length) {
    throw new CustomError("gid not valid", 400);
  }

  const deletedGroup = await db
    .delete(groups)
    .where(eq(groups.id, id))
    .returning();

  return deletedGroup[0];
};

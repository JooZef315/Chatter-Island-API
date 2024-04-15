import { db } from "../../config/DB";
import { users } from "../../drizzle/schema";
import { eq } from "drizzle-orm";
import { CustomError } from "../../utils/customErrors";

export const deleteUser = async (id: string) => {
  const user = await db.select().from(users).where(eq(users.id, id));

  if (!user.length) {
    throw new CustomError("user not found", 404);
  }

  const deletedUser = await db
    .delete(users)
    .where(eq(users.id, id))
    .returning();

  return deletedUser[0];
};

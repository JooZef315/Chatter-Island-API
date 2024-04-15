import { z } from "zod";

export const userZodSchema = z
  .object({
    username: z
      .string()
      .trim()
      .min(1, { message: "username is required" })
      .toLowerCase()
      .transform((val) => val.trim().replace(/\s+/g, "_")),
    bio: z
      .string()
      .trim()
      .max(50, { message: "bio must be at most 50 characters long" })
      .optional(),
    password: z
      .string()
      .min(4, { message: "Password must be at least 4 characters long" }),
    confirmPasswrod: z
      .string()
      .min(4, { message: "Password must be at least 4 characters long" }),
    profilePicUrl: z.string().optional(),
  })
  .refine((data) => data.confirmPasswrod === data.password, {
    message: "Passwords don't match",
    path: ["confirmPasswrod"],
  });

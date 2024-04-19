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

export const groupZodSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "name is required" })
    .transform((val) => val.trim().replace(/\s+/g, "-")),
  description: z
    .string()
    .trim()
    .max(100, { message: "description must be at most 100 characters long" })
    .optional()
    .default("this is a new group chat on chatter island!"),
  capacity: z.literal(3).or(z.literal(10)).or(z.literal(25)).or(z.literal(50)),
});

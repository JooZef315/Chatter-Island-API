import { z } from "zod";
import { userZodSchema, groupZodSchema } from "./zodSchemas";

export type TZodError = {
  message: string;
};

export type TUser = z.infer<typeof userZodSchema>;

export type TGroup = z.infer<typeof groupZodSchema>;

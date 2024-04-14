import { z } from "zod";
import {
  userZodSchema,
  blogZodSchema,
  commentZodSchema,
  resetingPasswordZodSchema,
} from "./zodSchemas";

export type TZodError = {
  message: string;
};

export type TUser = z.infer<typeof userZodSchema>;

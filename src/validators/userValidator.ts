import { generateZodCustomError } from "../utils/customErrors";
import { userZodSchema } from "./zodSchemas";
import { TUser, TZodError } from "./zodTypes";

export const validateUser = (reqData: TUser) => {
  const parsedData = userZodSchema.safeParse(reqData);
  if (!parsedData.success) {
    const error: TZodError = generateZodCustomError(parsedData.error);
    return { userData: null, error };
  } else {
    const userData: TUser = parsedData.data;
    return { userData, error: null };
  }
};

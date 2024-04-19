import { generateZodCustomError } from "../utils/customErrors";
import { groupZodSchema } from "./zodSchemas";
import { TGroup, TZodError } from "./zodTypes";

export const validateGroup = (reqData: TGroup) => {
  const parsedData = groupZodSchema.safeParse(reqData);
  if (!parsedData.success) {
    const error: TZodError = generateZodCustomError(parsedData.error);
    return { groupData: null, error };
  } else {
    const groupData: TGroup = parsedData.data;
    return { groupData, error: null };
  }
};

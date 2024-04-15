import { UploadClient } from "@uploadcare/upload-client";
import fs from "fs";
import { CustomError } from "./customErrors";

export const uploadCareClient = async (Imagepath: string) => {
  const client = new UploadClient({
    publicKey: process.env.UPLOADCARE_SECRET!,
  });
  try {
    const imageBuffer = await fs.promises.readFile(Imagepath);

    const result = await client.uploadFile(imageBuffer);
    console.log(result);
    return result.cdnUrl;
  } catch (error: any) {
    throw new CustomError(`Error reading file: ${error.message}`, 500);
  }
};

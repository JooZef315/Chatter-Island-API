import multer, { FileFilterCallback } from "multer";
import { Request } from "express";

type ImageType = "users" | "messages";

export const initUpload = (imageType: ImageType) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, `./assets/${imageType}`);
    },
    filename: (req, file, cb) => {
      if (file) {
        const fileName = `${Date.now()}-${file.originalname}`;
        cb(null, fileName);
      } else {
        cb(null, "ERROR: No file");
      }
    },
  });

  const fileFilter = (
    req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback
  ) => {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };

  const upload = multer({ storage, fileFilter });

  return upload;
};

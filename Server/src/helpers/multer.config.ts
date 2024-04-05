import { diskStorage } from "multer";
import { extname } from "path";
import { BadRequestException } from "@nestjs/common";
import * as path from "path";
import * as shortid from "shortid";
const allowedFileTypes = [".doc", ".pdf", ".docx"];

// returns list of files saved
export const multerConfig = {
  storage: diskStorage({
    destination: "./src/files/upload",
    filename: (req, file, callback) => {
      try {
        const uniqueSuffix =
          path.parse(file.originalname).name +
          "_" +
          shortid.generate() +
          extname(file.originalname);
        callback(null, uniqueSuffix);
      } catch (error) {
        callback(error, null);
      }
    },
  }),
  fileFilter: (req, file, callback) => {
    const ext = extname(file.originalname);
    if (!allowedFileTypes.includes(ext)) {
      return callback(
        new BadRequestException(
          "Invalid file type. Please upload only pdf or doc file only"
        ),
        false
      );
    }
    callback(null, true);
  },

  limits: {
    fileSize: 1024 * 1024 * 5,
  },
};

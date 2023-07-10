import multer from "multer";
import { ErrorMessage } from "./ErrorMessage.js";

let setting = (folderName) => {
  const storage = multer.diskStorage({
    destination(req, file, cb) {
      cb(null, `uploads/${folderName}`);
    },
    filename(req, file, cb) {
      const unique = `${Date.now()}-${file.originalname}`;
      cb(null, unique);
    },
  });

  const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
      return cb(null, true);
    } else {
      cb(ErrorMessage(400, "Images only!"), false);
    }
  };
  return multer({
    storage,
    fileFilter,
  });
};
export const uploadSingleFile = (fieldName, folderName) => {
  return setting(folderName).single(fieldName);
};

export const uploadMixFile = (arrayOfFields, folderName) => {
  return setting(folderName).fields(arrayOfFields);
};

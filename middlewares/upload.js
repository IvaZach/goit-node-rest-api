import multer from "multer";
import path from "path";
import { HttpError } from "../helpers/index.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve("tmp"));
  },
  filename: function (req, file, cb) {
    const uniquePrefix = `${Date.now()}`;
    const filename = `${uniquePrefix}_${file.originalname}`;
    cb(null, filename);
  },
});

const limits = {
  fileSize: 5 * 1024 * 1024,
};

const fileFilter = (req, file, cb) => {
  const extention = file.originalname.split(".").pop();
  if (extention === "exe") {
    return cb(HttpError(400, "Invalid file extention"));
  }
  cb(null, true);
};

const upload = multer({
  storage,
  limits,
  fileFilter
});

export default upload;

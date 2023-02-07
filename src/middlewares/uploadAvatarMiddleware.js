const multer = require("multer");
const path = require("path");
const { v4: uuid } = require("uuid");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve("./src/tmp"));
  },
  filename: (req, file, cb) => {
    const [, extension] = file.originalname.split(".");
    cb(null, `${uuid()}.${extension}`);
  },
});

const uploadAvatar = multer({
  storage,
});

module.exports = { uploadAvatar };

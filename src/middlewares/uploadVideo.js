const multer = require("multer");

const storage = multer.memoryStorage();

const uploadVideo = multer({
  storage,
  limits: { fileSize: 100 * 1024 * 1024 }, // max 100MB (video)
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("video/")) {
      cb(null, true);
    } else {
      cb(new Error("Hanya file video yang diperbolehkan"), false);
    }
  },
});

module.exports = uploadVideo;

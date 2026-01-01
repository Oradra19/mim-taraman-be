const multer = require("multer");
const path = require("path");

const storage = (folder) =>
  multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, `public/uploads/${folder}`);
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      cb(null, `banner_${Date.now()}${ext}`);
    },
  });

const fileFilter = (req, file, cb) => {
  const allowed = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
  if (allowed.includes(file.mimetype)) cb(null, true);
  else cb(new Error("Format file tidak didukung"), false);
};

const upload = (folder) =>
  multer({
    storage: storage(folder),
    fileFilter,
    limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
  });

module.exports = upload;

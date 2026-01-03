require("dotenv").config();
const multer = require("multer");
const cloudinary = require("cloudinary").v2;

// import default sesuai CommonJS
const CloudinaryStorageModule = require("multer-storage-cloudinary");
const CloudinaryStorage = CloudinaryStorageModule.CloudinaryStorage || CloudinaryStorageModule.default || CloudinaryStorageModule;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: (req, file) => {
    if (file.mimetype.startsWith("video/")) {
      return {
        folder: "video",
        allowed_formats: ["mp4", "mov", "webm"],
        public_id: `video-${Date.now()}`,
      };
    } else if (file.mimetype.startsWith("image/")) {
      return {
        folder: "image",
        allowed_formats: ["jpg", "jpeg", "png", "webp"],
        public_id: `image-${Date.now()}`,
      };
    } else {
      throw new Error("Hanya gambar atau video yang diperbolehkan");
    }
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 20 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/") || file.mimetype.startsWith("video/")) {
      cb(null, true);
    } else {
      cb(new Error("Hanya gambar atau video yang diperbolehkan"), false);
    }
  },
});

module.exports = upload;

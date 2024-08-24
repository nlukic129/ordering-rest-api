import multer from "multer";

const configureMulter = () => {
  const storage = multer.memoryStorage();
  return multer({ storage: storage }).single("image");
};

export const uploadMiddleware = configureMulter();

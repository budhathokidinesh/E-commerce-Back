import { v2 as cloudinary } from "cloudinary";
import multer from "multer";

//this is for cloudinary configuration
cloudinary.config({
  cloud_name: "defacp1zu",
  api_key: "455349279187623",
  api_secret: "7m9GR1GTy6W450zMAL2iVpEVoRk",
});
const storage = new multer.memoryStorage();

export const imageUploadUtils = async (file) => {
  const result = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });
  return result;
};
export const upload = multer({ storage });

import express from "express";

import { handleImageUpload } from "../../controllers/admin/productsControllers.js";
import { upload } from "../../helpers/cloudinary.js";

const router = express.Router();
router.post("/upload-image", upload.single("my_file"), handleImageUpload);
export default router;

import express from "express";
import {
  addFeatureImage,
  getFeatureImage,
} from "../../controllers/common/featureController.js";

const router = express.Router();
router.post("/add", addFeatureImage);
router.get("/get", getFeatureImage);
export default router;

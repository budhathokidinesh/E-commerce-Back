import express from "express";

import { getFilteredProducts } from "../../controllers/shopping/productsController.js";

const router = express.Router();

router.get("/get", getFilteredProducts);
export default router;

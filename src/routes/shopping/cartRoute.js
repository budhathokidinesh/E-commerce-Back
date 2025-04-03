import express from "express";
import {
  addToCart,
  deleteCartItems,
  fetchCartItems,
  updateCartItemsQty,
} from "../../controllers/shopping/cartController.js";

const router = express.Router();
router.post("/add", addToCart);
router.get("/get/:userId", fetchCartItems);
router.put("/update-cart", updateCartItemsQty);
router.delete("/delete/:userId/:productId", deleteCartItems);
export default router;

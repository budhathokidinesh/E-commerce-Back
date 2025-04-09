import Order from "../../models/Order.js";
import Product from "../../models/ProductModel.js";
import Review from "../../models/Reviews.js";

//this is adding reviews
export const addProductReview = async (req, res) => {
  try {
    const { productId, userId, userName, reviewMessage, reviewValue } =
      req.body;
    const order = await Order.findOne({
      userId,
      "cartItems.productId": productId,
      orderStatus: "confirmed",
    });

    if (!order) {
      return res.status(403).json({
        success: false,
        message: "You need to purchase this product to review it.",
      });
    }
    const checkExistingReview = await Review.findOne({ productId, userId });
    if (checkExistingReview) {
      return res.status(400).json({
        success: false,
        message: "You already reviewed this product",
      });
    }
    const newReview = new Review({
      productId,
      userId,
      userName,
      reviewMessage,
      reviewValue,
    });
    await newReview.save();
    const reviews = await Review.find({ productId });
    const totalReviewsLength = reviews.length;
    const averageReview =
      reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) /
      totalReviewsLength;
    await Product.findByIdAndUpdate(productId, { averageReview });
    res.status(201).json({
      success: true,
      data: newReview,
    });
  } catch (error) {
    console.log(first);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};
//this is for getting reviews
export const getProductReview = async (req, res) => {
  try {
    const { productId } = req.params;
    const reviews = await Review.find({ productId });
    res.status(200).json({
      success: true,
      data: reviews,
    });
  } catch (error) {
    console.log(first);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};

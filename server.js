import express from "express";

import { dbConnect } from "./src/config/dbConfig.js";
import { responseClient } from "./src/middlewares/responseClient.js";
const app = express();
const PORT = process.env.PORT || 8000;

//end points
//this is for authentication
import authRoutes from "./src/routes/auth/authRoutes.js";

//this is for admin endpoints
import adminProductRoute from "./src/routes/admin/productRoute.js";
import adminOrderRoute from "./src/routes/admin/orderRoute.js";

//this is for shopping endpoints
import shopProductRoute from "./src/routes/shopping/shopProductRoute.js";
import shopCartRoute from "./src/routes/shopping/cartRoute.js";
import shopAddressRoute from "./src/routes/shopping/addressRoute.js";
import shopReviewRoute from "./src/routes/shopping/reviewRoute.js";
import shopOrderRoute from "./src/routes/shopping/orderRoute.js";
import shopSearchRoute from "./src/routes/shopping/searchRoute.js";
import featureRoute from "./src/routes/commonRoute/featureRoute.js";

//middlewares
import cookieparser from "cookie-parser";
import cors from "cors";
app.use(
  cors({
    origin: " http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);
app.use(cookieparser());
app.use(express.json());
//this is authentication
app.use("/api/auth", authRoutes);

//this is for admin
app.use("/api/admin/products", adminProductRoute);
app.use("/api/admin/orders", adminOrderRoute);

//this is for shopping
app.use("/api/shop/products", shopProductRoute);
app.use("/api/shop/cart", shopCartRoute);
app.use("/api/shop/address", shopAddressRoute);
app.use("/api/shop/order", shopOrderRoute);
app.use("/api/shop/search", shopSearchRoute);
app.use("/api/shop/review", shopReviewRoute);

//this is for feature images
app.use("/api/common/feature", featureRoute);

//server status
app.get("/", (req, res) => {
  const message = "server is live";
  responseClient({ req, res, message });
});

//db connection
dbConnect().then(() => {
  app.listen(PORT, (error) => {
    error
      ? console.log(error)
      : console.log("Server is running at http://localhost:" + PORT);
  });
});

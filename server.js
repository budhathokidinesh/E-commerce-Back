import express from "express";

import { dbConnect } from "./src/config/dbConfig.js";
import { responseClient } from "./src/middlewares/responseClient.js";
const app = express();
const PORT = process.env.PORT || 8000;

//end points
import authRoutes from "./src/routes/authRoutes.js";
import adminProductRoute from "./src/routes/admin/productRoute.js";
import shopProductRoute from "./src/routes/shopping/shopProductRoute.js";
import shopCartRoute from "./src/routes/shopping/cartRoute.js";
import shopAddressRoute from "./src/routes/shopping/addressRoute.js";
import shopOrderRoute from "./src/routes/shopping/orderRoute.js";
import adminOrderRoute from "./src/routes/admin/orderRoute.js";

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
app.use("/api/auth", authRoutes);
app.use("/api/admin/products", adminProductRoute);
app.use("/api/shop/products", shopProductRoute);
app.use("/api/shop/cart", shopCartRoute);
app.use("/api/shop/address", shopAddressRoute);
app.use("/api/shop/order", shopOrderRoute);
app.use("/api/admin/orders", adminOrderRoute);

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

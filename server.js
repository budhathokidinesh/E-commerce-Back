import express from "express";

import { dbConnect } from "./src/config/dbConfig.js";
import { responseClient } from "./src/middlewares/responseClient.js";
const app = express();
const PORT = process.env.PORT || 8000;

//end points
import authRoutes from "./src/routes/authRoutes.js";

//middlewares
import cookieparser from "cookie-parser";
import cors from "cors";
app.use(
  cors({
    origin: " http://localhost:5173/",
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

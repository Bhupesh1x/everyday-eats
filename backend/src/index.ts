import cors from "cors";
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";
import express, { Request, Response } from "express";
import "dotenv/config";

import connectDb from "./lib/connectDb";

import userRoutes from "./routes/user.routes";
import myRestaurantRoutes from "./routes/myrestaurant.routes";

const PORT = process.env.PORT || 7000;
const app = express();

connectDb();

cloudinary.config({
  api_key: process.env.CLOUDINARY_API_KEY,
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(
  cors({
    origin: process.env.CLIENT_URL!,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/health", (req: Request, res: Response) => {
  res.json({ message: "Health OK!" });
});

app.use("/api/user", userRoutes);
app.use("/api/my/restaurant", myRestaurantRoutes);

app.listen(PORT, () => {
  console.log(`server is running on port:${PORT}`);
});

import multer from "multer";
import express from "express";

import {
  createMyRestaurant,
  getMyRestaurant,
  updateMyRestaurant,
} from "../controllers/myrestaurant.controllers";
import { createRestaurantValidations } from "../lib/validations";
import { verifyAuth } from "../middlewares/auth";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fieldSize: 5 * 1024 * 1024, //5MB
  },
});

router.post(
  "/",
  upload.single("imageFile"),
  createRestaurantValidations,
  verifyAuth,
  createMyRestaurant
);

router.get("/", verifyAuth, getMyRestaurant);
router.put(
  "/update",
  upload.single("imageFile"),
  verifyAuth,
  updateMyRestaurant
);

export default router;

import express from "express";

import {
  getRestaurantByIdValidations,
  searchRestaurantValidations,
} from "../lib/validations";

import {
  getRestaurantById,
  searchRestaurant,
} from "../controllers/restaurant.controller";

const router = express.Router();

router.get("/:id", getRestaurantByIdValidations, getRestaurantById);
router.get("/search/:city", searchRestaurantValidations, searchRestaurant);

export default router;

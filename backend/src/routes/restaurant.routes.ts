import express from "express";

import { searchRestaurantValidations } from "../lib/validations";

import { searchRestaurant } from "../controllers/restaurant.controller";

const router = express.Router();

router.get("/search/:city", searchRestaurantValidations, searchRestaurant);

export default router;

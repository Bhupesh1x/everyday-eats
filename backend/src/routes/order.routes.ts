import express from "express";

import { verifyAuth } from "../middlewares/auth";
import {
  getMyOrders,
  stripeWebhookHandler,
  createCheckoutSession,
  getMyRestaurantOrders,
  updateOrderStatus,
} from "../controllers/order.controllers";

const router = express.Router();

router.get("/", verifyAuth, getMyOrders);
router.get("/my/orders", verifyAuth, getMyRestaurantOrders);
router.put("/:id/status", verifyAuth, updateOrderStatus);

router.post("/checkout/session", verifyAuth, createCheckoutSession);
router.post("/checkout/webhook", stripeWebhookHandler);

export default router;

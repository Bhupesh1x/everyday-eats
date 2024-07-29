import express from "express";

import { verifyAuth } from "../middlewares/auth";
import {
  getMyOrders,
  stripeWebhookHandler,
  createCheckoutSession,
} from "../controllers/order.controllers";

const router = express.Router();

router.get("/", verifyAuth, getMyOrders);

router.post("/checkout/session", verifyAuth, createCheckoutSession);
router.post("/checkout/webhook", stripeWebhookHandler);

export default router;

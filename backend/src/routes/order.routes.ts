import express from "express";

import { verifyAuth } from "../middlewares/auth";
import {
  createCheckoutSession,
  stripeWebhookHandler,
} from "../controllers/order.controllers";

const router = express.Router();

router.post("/checkout/session", verifyAuth, createCheckoutSession);
router.post("/checkout/webhook", stripeWebhookHandler);

export default router;

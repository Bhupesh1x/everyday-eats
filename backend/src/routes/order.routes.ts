import express from "express";

import { verifyAuth } from "../middlewares/auth";
import { createCheckoutSession } from "../controllers/order.controllers";

const router = express.Router();

router.post("/checkout/session", verifyAuth, createCheckoutSession);

export default router;

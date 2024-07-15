import express from "express";

import {
  login,
  logout,
  register,
  userSession,
  verifyUserEmail,
} from "../controllers/user.controllers";
import { verifyAuth } from "../middlewares/auth";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/verify-email", verifyUserEmail);
router.get("/session", verifyAuth, userSession);
router.get("/logout", logout);

export default router;

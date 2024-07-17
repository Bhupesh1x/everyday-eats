import express from "express";

import {
  loginValidations,
  registerValidations,
  verifyEmailValidations,
} from "../lib/validations";

import {
  login,
  logout,
  register,
  userSession,
  verifyUserEmail,
} from "../controllers/user.controllers";

import { verifyAuth } from "../middlewares/auth";

const router = express.Router();

router.post("/login", loginValidations, login);
router.post("/register", registerValidations, register);
router.post("/verify-email", verifyEmailValidations, verifyUserEmail);
router.get("/session", verifyAuth, userSession);
router.post("/logout", logout);

export default router;

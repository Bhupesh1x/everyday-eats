import express from "express";

import {
  loginValidations,
  registerValidations,
  updateUserValidations,
  verifyEmailValidations,
} from "../lib/validations";

import {
  getCurrentUserDetail,
  login,
  logout,
  register,
  updateUserDetails,
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

router.get("/me", verifyAuth, getCurrentUserDetail);
router.put(
  "/update-user",
  updateUserValidations,
  verifyAuth,
  updateUserDetails
);

export default router;

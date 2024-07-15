import express from "express";

import {
  login,
  register,
  verifyUserEmail,
} from "../controllers/user.controllers";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/verify-email", verifyUserEmail);

export default router;

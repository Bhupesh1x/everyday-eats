import express from "express";

import { register, verifyUserEmail } from "../controllers/user.controllers";

const router = express.Router();

router.post("/register", register);
router.post("/verify-email", verifyUserEmail);

export default router;

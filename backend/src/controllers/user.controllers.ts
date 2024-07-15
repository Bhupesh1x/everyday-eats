import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";

import { errorMessage, sendEmail, verifyEmailToken } from "../lib/utils";

import { User } from "../models/user.model";

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    let user;

    user = await User.findOne({ email });

    if (user) {
      return errorMessage(res, "User already exists", 400);
    }

    const hashedPassword = await bcrypt.hash(password, 6);

    user = await User.create({
      ...req.body,
      password: hashedPassword,
      isVerified: false,
    });

    const token = await jwt.sign(
      { userId: user._id },
      process.env.JWT_VERIFY_SECRET!
    );

    const message = `Thanks for creating your account. Verify your email by clicking on the link so you can get up and running quickly.
    
${process.env.MAIL_BASE_URL}/verify/${user._id}/token/${token}`;

    await sendEmail(user.email, "Verify your email", message);

    res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    console.log("register-error", error);
    return errorMessage(res);
  }
};

export const verifyUserEmail = async (req: Request, res: Response) => {
  try {
    const { userId, token } = req.body;

    if (!userId || !token) {
      return errorMessage(
        res,
        "Invalid verification link. Please check your verification link and try again",
        400
      );
    }

    const user = await User.findById(userId);

    if (!user) {
      return errorMessage(
        res,
        "Invalid verification link. Please check your verification link and try again",
        400
      );
    }

    const isTokenValid = await verifyEmailToken({
      userId: user._id?.toString(),
      token,
    });

    if (!isTokenValid) {
      return errorMessage(
        res,
        "Invalid verification link. Please check your verification link and try again",
        400
      );
    }

    await user.updateOne({ isVerified: true });
    return res.json({
      message: "User verified successfully. Please login to continue",
    });
  } catch (error) {
    console.log("verify-error", error);
    return errorMessage(res);
  }
};

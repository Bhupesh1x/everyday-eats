import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";

import {
  errorMessage,
  sendEmail,
  sendToken,
  verifyEmailToken,
} from "../lib/utils";

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

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select([
      "password",
      "isVerified",
    ]);

    if (!user) {
      return errorMessage(res, "Invalid credentials", 400);
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return errorMessage(res, "Invalid credentials", 400);
    }

    if (!user.isVerified) {
      return errorMessage(
        res,
        "An email sent to your account. Please verify before logging in.",
        400
      );
    }

    await sendToken(res, user._id?.toString());
  } catch (error) {
    console.log("login-error", error);
    return errorMessage(res);
  }
};

export const userSession = (req: Request, res: Response) => {
  res.send({ userId: req?.userId });
};

export const logout = (req: Request, res: Response) => {
  res
    .cookie("everyday-eats-token", "", {
      expires: new Date(0),
    })
    .json({ message: "User logout successfully" });
};

export const getCurrentUserDetail = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return errorMessage(res, "User not found", 404);
    }

    return res.json(user);
  } catch (error) {
    console.log("getCurrentUserDetail-error", error);
    return errorMessage(res);
  }
};

export const updateUserDetails = async (req: Request, res: Response) => {
  try {
    const { name, address, city, country } = req.body;

    const user = await User.findById(req.userId);

    if (!user) {
      return errorMessage(res, "User not found", 404);
    }

    user.name = name;
    user.address = address;
    user.city = city;
    user.country = country;

    await user.save();

    return res.json(user);
  } catch (error) {
    console.log("updateUserDetails-error", error);
    return errorMessage(res);
  }
};

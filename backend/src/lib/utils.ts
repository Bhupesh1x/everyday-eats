import nodemailer from "nodemailer";
import { Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export const errorMessage = (
  res: Response,
  message?: string,
  code?: number
) => {
  const errMessage = message || "Internal server error";
  const statusCode = code || 500;

  return res.status(statusCode).json({ message });
};

export const sendEmail = async (
  email: string,
  subject: string,
  text: string
) => {
  try {
    const transport = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      service: process.env.MAIL_SERVICE,
      port: 587,
      secure: true,
      auth: {
        user: process.env.MAIL_USER_EMAIL,
        pass: process.env.MAIL_USER_PASS,
      },
    });

    await transport.sendMail({
      from: process.env.MAIL_USER_EMAIL,
      to: email,
      subject,
      text,
    });
  } catch (error) {
    console.log("sendEmail-error", error);
    throw new Error(`${error}`);
  }
};

type VerifyEmailTokenParams = {
  userId: string;
  token: string;
};

export const verifyEmailToken = async ({
  userId,
  token,
}: VerifyEmailTokenParams) => {
  try {
    const decoded = (await jwt.verify(
      token,
      process.env.JWT_VERIFY_SECRET!
    )) as JwtPayload;

    if (!decoded) {
      return false;
    }

    if (decoded.userId !== userId) {
      return false;
    }

    return true;
  } catch (error) {
    console.log("VerifyEmailToken-error", error);
    return false;
  }
};

export const sendToken = async (res: Response, userId: string) => {
  const token = await jwt.sign({ userId }, process.env.JWT_SECRET!, {
    expiresIn: "1d",
  });

  res
    .cookie("everyday-eats-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 86400000,
    })
    .json({ message: "User logged in successfully" });
};

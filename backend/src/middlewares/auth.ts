import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

import { errorMessage } from "../lib/utils";

declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}

export const verifyAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies["everyday-eats-token"];

    if (!token) {
      return errorMessage(res, "User unauthorized", 401);
    }

    const decode = await jwt.verify(token, process.env.JWT_SECRET!);

    if (!decode) {
      return errorMessage(res, "User unauthorized", 401);
    }

    req.userId = (decode as JwtPayload)?.userId;

    next();
  } catch (error) {
    console.log("verifyAuth", error);
    return errorMessage(res, "User unauthorized", 401);
  }
};

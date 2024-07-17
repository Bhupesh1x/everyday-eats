import { check, validationResult } from "express-validator";
import { NextFunction, Request, Response } from "express";

import { errorMessage } from "./utils";

const handleValidationErrors = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = errors.array()[0];
    return errorMessage(res, error.msg, 400);
  }
  next();
};

export const registerValidations = [
  check("name", "Name is required").ltrim().isLength({ min: 2 }),
  check("email", "Email is required").isEmail(),
  check("password", "Password should be atleast 6 characters")
    .ltrim()
    .isLength({
      min: 6,
    }),
  handleValidationErrors,
];

export const loginValidations = [
  check("email", "Email is required").isEmail(),
  check("password", "Password should be atleast 6 characters")
    .ltrim()
    .isLength({
      min: 6,
    }),
  handleValidationErrors,
];

export const verifyEmailValidations = [
  check("userId", "Invalid Request").ltrim().isLength({ min: 4 }),
  check("token", "Invalid request").ltrim().isLength({
    min: 6,
  }),
  handleValidationErrors,
];

export const updateUserValidations = [
  check("name", "name is required").ltrim().isLength({ min: 2 }),
  check("address", "Address should be atleast 6 characters")
    .ltrim()
    .isLength({ min: 6 }),

  check("city", "City is required").ltrim().isLength({ min: 3 }),

  check("country", "Country is required").ltrim().isLength({ min: 3 }),
  handleValidationErrors,
];

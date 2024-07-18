import { body, check, validationResult } from "express-validator";
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
  check("name", "name should be atleast have 2 characters")
    .ltrim()
    .isLength({ min: 2 }),
  check("address", "Address should be atleast have 6 characters")
    .ltrim()
    .isLength({ min: 6 }),

  check("city", "City should be atleast have 3 characters")
    .ltrim()
    .isLength({ min: 3 }),

  check("country", "Country should be atleast have 3 characters")
    .ltrim()
    .isLength({ min: 3 }),
  handleValidationErrors,
];

export const createRestaurantValidations = [
  body("name", "Restaurant name must have atleast 2 characters")
    .ltrim()
    .isLength({ min: 2 }),
  body("city", "City must have atleast 3 characters")
    .ltrim()
    .isLength({ min: 3 }),
  body("country", "Country must have atleast 3 characters")
    .ltrim()
    .isLength({ min: 3 }),
  body("deliveryPrice", "Delivery price must have a positive number").isFloat({
    min: 0,
  }),
  body(
    "estimatedDeliveryTime",
    "Delivery time price must have a positive number"
  ).isInt({ min: 0 }),
  body("cuisines")
    .isArray()
    .withMessage("Cuisines must be an array")
    .not()
    .isEmpty()
    .withMessage("Cuisines array cannot be empty"),
  body("menuItems").isArray().withMessage("Menu items must be a array"),
  body("menuItems.*.name")
    .notEmpty()
    .withMessage("Menu items name is required"),
  body("menuItems.*.price")
    .notEmpty()
    .withMessage("Menu items price is required"),
  handleValidationErrors,
];

import clodinary from "cloudinary";
import { Request, Response } from "express";

import { errorMessage, uploadFile } from "../lib/utils";

import { Restaurant } from "../models/restaurant.model";

export const createMyRestaurant = async (req: Request, res: Response) => {
  try {
    const existingRestaurant = await Restaurant.findOne({ user: req.userId });

    if (existingRestaurant) {
      return errorMessage(res, "User restaurant already exists", 409);
    }

    const image = req.file as Express.Multer.File;
    const imageUrl = await uploadFile(image);

    const restaurant = await Restaurant.create({
      user: req.userId,
      imageUrl: imageUrl,
      ...req.body,
    });

    return res.status(201).json(restaurant);
  } catch (error) {
    console.log(error);
    return errorMessage(res);
  }
};

export const getMyRestaurant = async (req: Request, res: Response) => {
  try {
    const restaurant = await Restaurant.findOne({ user: req.userId });

    if (!restaurant) {
      return errorMessage(res, "Restaurant not found", 404);
    }

    return res.json(restaurant);
  } catch (error) {
    console.log(error);
    return errorMessage(res);
  }
};

export const updateMyRestaurant = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const restaurant = await Restaurant.findOne({ user: req.userId });

    if (!restaurant) {
      return errorMessage(res, "Restaurant not found", 404);
    }

    restaurant.name = body.name;
    restaurant.city = body.city;
    restaurant.country = body.country;
    restaurant.deliveryPrice = body.deliveryPrice;
    restaurant.estimatedDeliveryTime = body.estimatedDeliveryTime;
    restaurant.cuisines = body.cuisines;
    restaurant.menuItems = body.menuItems;

    if (req.file) {
      const image = req.file as Express.Multer.File;
      const imageUrl = await uploadFile(image);

      restaurant.imageUrl = imageUrl;
    }

    await restaurant.save();

    return res.send(restaurant);
  } catch (error) {
    console.log(error);
    return errorMessage(res);
  }
};

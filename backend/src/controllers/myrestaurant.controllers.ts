import clodinary from "cloudinary";
import { Request, Response } from "express";

import { errorMessage } from "../lib/utils";

import { Restaurant } from "../models/restaurant.model";

export const createMyRestaurant = async (req: Request, res: Response) => {
  try {
    const existingRestaurant = await Restaurant.findOne({ user: req.userId });

    if (existingRestaurant) {
      return errorMessage(res, "User restaurant already exists", 409);
    }

    const image = req.file as Express.Multer.File;
    const b64Image = Buffer.from(image.buffer).toString("base64");
    const dataURI = `data:${image.mimetype};base64,${b64Image}`;

    const uploadedFile = await clodinary.v2.uploader.upload(dataURI);

    const restaurant = await Restaurant.create({
      user: req.userId,
      imageUrl: uploadedFile.url,
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

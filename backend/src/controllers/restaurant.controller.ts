import { Request, Response } from "express";

import { errorMessage } from "../lib/utils";

import { Restaurant } from "../models/restaurant.model";

export const searchRestaurant = async (req: Request, res: Response) => {
  try {
    const { city } = req.params;
    let query: any = {};

    query["city"] = new RegExp(city, "i");

    const restaurantCount = await Restaurant.countDocuments(query);

    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(process.env.limit as string) || 10;
    const skip = (page - 1) * limit;

    if (!restaurantCount) {
      return res.status(404).json({
        data: [],
        pagination: {
          page,
          pageSize: limit,
          total: 0,
          totalPages: 0,
        },
      });
    }

    const searchQuery = (req.query.search as string) || "";
    const cuisinesQuery = (req.query.cuisines as string) || "";
    const sortOptions = (req.query.sortOptions as string) || "updatedAt";

    if (searchQuery) {
      const searchRegex = new RegExp(searchQuery, "i");

      query["$or"] = [
        { name: searchRegex },
        { cuisines: { $in: [searchRegex] } },
      ];
    }

    if (cuisinesQuery) {
      const cuisinesArray = cuisinesQuery
        .split(",")
        .map((cuisine) => new RegExp(cuisine));

      query["cuisines"] = {
        $all: cuisinesArray,
      };
    }

    const restaurantsPromise = Restaurant.find(query)
      .sort({
        [sortOptions]: 1,
      })
      .skip(skip)
      .limit(limit)
      .lean();

    const totalPromise = Restaurant.countDocuments(query);

    const [restaurants, total] = await Promise.all([
      restaurantsPromise,
      totalPromise,
    ]);

    const response = {
      data: restaurants,
      pagination: {
        page,
        pageSize: limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };

    res.json(response);
  } catch (error) {
    console.log("searchRestaurant-error", error);
    return errorMessage(res);
  }
};

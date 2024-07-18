import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: String, required: true },
});

const restaurantSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    name: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    deliveryPrice: { type: Number, required: true },
    estimatedDeliveryTime: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    cuisines: [{ type: String, required: true }],
    menuItems: [menuItemSchema],
  },
  { timestamps: true }
);

export const Restaurant = mongoose.model("Restaurant", restaurantSchema);

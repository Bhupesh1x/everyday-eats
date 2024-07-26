import Stripe from "stripe";
import { Request, Response } from "express";

import { errorMessage } from "../lib/utils";
import { MenuItemType, Restaurant } from "../models/restaurant.model";

const stripe = new Stripe(process.env.STRIPE_API_KEY!);
const clientUrl = process.env.CLIENT_URL;

type CheckoutSessionRequest = {
  cartItems: {
    name: string;
    quantity: string;
    menuItemId: string;
  }[];
  deliveryDetails: {
    name: string;
    city: string;
    email: string;
    address: string;
  };
  restaurantId: string;
};

export const createCheckoutSession = async (req: Request, res: Response) => {
  try {
    const body: CheckoutSessionRequest = req.body;

    const restaurant = await Restaurant.findById(body.restaurantId);

    if (!restaurant) {
      return errorMessage(res, "Restaurant not found", 404);
    }

    const lineItems = createLineItems(body, restaurant.menuItems);

    const session = await createSession(
      lineItems,
      "ORDER_ID",
      restaurant.deliveryPrice,
      restaurant._id.toString()
    );

    if (!session.url) {
      return errorMessage(res, "Error creating stripe session");
    }

    res.json({ url: session.url });
  } catch (error: any) {
    console.log("createCheckoutSession-error", error);
    return errorMessage(res, error.raw.message, 500);
  }
};

const createLineItems = (
  body: CheckoutSessionRequest,
  menuItems: MenuItemType[]
) => {
  const lineItems = body.cartItems.map((cartItem) => {
    const menuItem = menuItems.find(
      (item) => item._id.toString() === cartItem.menuItemId.toString()
    );

    if (!menuItem) {
      throw new Error(`Menu item not found: ${cartItem.menuItemId}`);
    }

    const lineItem: Stripe.Checkout.SessionCreateParams.LineItem = {
      price_data: {
        currency: "inr",
        unit_amount: parseInt(menuItem.price),
        product_data: {
          name: menuItem.name,
        },
      },
      quantity: parseInt(cartItem.quantity),
    };

    return lineItem;
  });

  return lineItems;
};

const createSession = async (
  lineItems: Stripe.Checkout.SessionCreateParams.LineItem[],
  orderId: string,
  deliveryPrice: number,
  restaurantId: string
) => {
  const sessionData = await stripe.checkout.sessions.create({
    line_items: lineItems,
    shipping_options: [
      {
        shipping_rate_data: {
          display_name: "Delivery",
          type: "fixed_amount",
          fixed_amount: {
            amount: deliveryPrice,
            currency: "inr",
          },
        },
      },
    ],
    mode: "payment",
    metadata: {
      orderId,
      restaurantId,
    },
    success_url: `${clientUrl}/order-status?success=true`,
    cancel_url: `${clientUrl}/restaurant/${restaurantId}/cancelled=true`,
  });

  return sessionData;
};

import Stripe from "stripe";
import { Request, Response } from "express";

import { errorMessage } from "../lib/utils";

import { Order } from "../models/order.model";
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

    const order = await Order.create({
      cartItems: body.cartItems,
      deliveryDetails: body.deliveryDetails,
      restaurant: restaurant._id,
      status: "placed",
      user: req.userId,
    });

    const session = await createSession(
      lineItems,
      order._id.toString(),
      restaurant.deliveryPrice,
      restaurant._id.toString()
    );

    if (!session.url) {
      return errorMessage(res, "Error creating stripe session");
    }

    await order.save();
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

export const stripeWebhookHandler = async (req: Request, res: Response) => {
  let event;
  try {
    const sig = req.headers["stripe-signature"];
    event = stripe.webhooks.constructEvent(
      req.body,
      sig as string,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch (error: any) {
    console.log("stripeWebhookHandler-error", error);
    return errorMessage(res, `Webhook-error-${error.message}`, 400);
  }

  if (event.type === "checkout.session.completed") {
    const order = await Order.findById(event.data.object.metadata?.orderId);

    if (!order) {
      return errorMessage(res, "Order not found", 404);
    }

    order.totalAmount = event.data.object.amount_total;
    order.status = "paid";

    await order.save();
  }

  return res.status(200).send("Order updated successfully");
};

export const getMyOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find({ user: req.userId })
      .populate({
        path: "user",
        select: ["name", "email"],
      })
      .populate({
        path: "restaurant",
        select: ["name", "estimatedDeliveryTime", "imageUrl"],
      });

    return res.json(orders);
  } catch (error) {
    console.log("getMyOrders-error", error);
    return errorMessage(res);
  }
};

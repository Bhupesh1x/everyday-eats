import { API_BASE_URL } from "../../lib/utils";

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

export const createCheckoutSession = async (
  data: CheckoutSessionRequest
): Promise<{ url: string }> => {
  const res = await fetch(`${API_BASE_URL}/api/order/checkout/session`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error?.message);
  }

  return await res.json();
};

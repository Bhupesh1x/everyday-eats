import { OrderType } from "../../types";

import { Separator } from "../ui/separator";

type Props = {
  order: OrderType;
};
export const OrderStatusDetails = ({ order }: Props) => {
  return (
    <div className="space-y-6 md:w-[50%]">
      <div>
        <h1 className="text-lg font-semibold">Delivering to:</h1>
        <p>{order.deliveryDetails.name}</p>
      </div>

      <div>
        <h1 className="text-lg font-semibold">Your Order:</h1>
        {order.cartItems.map((cartItem, index) => (
          <p key={`${cartItem.menuItemId}-${index}`}>
            {cartItem.name} X {cartItem.quantity}
          </p>
        ))}
      </div>

      <Separator />

      <div>
        <h1 className="text-lg font-semibold">Total:</h1>

        <p>₹ {(order.totalAmount / 100).toFixed(2)}</p>
      </div>
    </div>
  );
};

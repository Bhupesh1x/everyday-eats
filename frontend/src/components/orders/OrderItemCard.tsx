import { useMemo, useState } from "react";

import { LoadingButton } from "../LoadingButton";

import { OrderStatus, OrderType } from "../../types";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

import { ORDER_STATUS } from "../../lib/constants";
import { useUpdateOrderStatus } from "../../features/order/query";

type Props = {
  order: OrderType;
};

export const OrderItemCard = ({ order }: Props) => {
  const [status, setStatus] = useState(order.status || "");
  const time = useMemo(() => {
    const date = new Date(order.createdAt);

    const hour = date.getHours();
    const minute = date.getMinutes();

    const paddedMinutes = minute < 10 ? `0${minute}` : minute;

    return `${hour}:${paddedMinutes}`;
  }, [order.createdAt]);

  const mutation = useUpdateOrderStatus();

  const handleUpdate = () => {
    mutation.mutate({
      id: order._id,
      status: status,
    });
  };

  return (
    <div className="border border-primary/50 shadow-sm py-3 px-4 rounded-md my-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <h3>
          <span className="font-semibold">Customer Name:</span>{" "}
          {order.deliveryDetails.name}
        </h3>
        <h3>
          <span className="font-semibold">Time:</span> {time}
        </h3>
        <h3>
          <span className="font-semibold">Delivery Address:</span>{" "}
          {order.deliveryDetails.address}, {order.deliveryDetails.city}
        </h3>
        <h3>
          <span className="font-semibold">Total Cost:</span>{" "}
          {order.deliveryDetails.name}
        </h3>
      </div>

      <Separator className="my-3" />

      <div className="space-y-3">
        {order.cartItems.map((cartItem) => (
          <div className="flex items-center gap-2" key={cartItem.menuItemId}>
            <p className="h-8 w-8 border border-primary/50 flex items-center justify-center rounded-md bg-white">
              {cartItem.quantity}
            </p>

            <p>{cartItem.name}</p>
          </div>
        ))}
      </div>

      <Separator className="my-3" />

      <div>
        <Label htmlFor="status">What is the status of the order?</Label>

        <Select
          value={status}
          disabled={mutation.isLoading}
          onValueChange={(value: OrderStatus) => setStatus(value)}
        >
          <SelectTrigger className="mt-2">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent position="popper">
            {ORDER_STATUS.map((item) => (
              <SelectItem value={item.value} key={item.progress}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {mutation.isLoading ? (
          <LoadingButton />
        ) : (
          <Button
            className="my-3 mt-6"
            disabled={status === order.status}
            onClick={handleUpdate}
          >
            Update
          </Button>
        )}
      </div>
    </div>
  );
};

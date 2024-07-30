import { useMemo } from "react";

import { Progress } from "../ui/progress";

import { OrderStatus } from "../../types";
import { ORDER_STATUS } from "../../lib/constants";

type Props = {
  status: OrderStatus;
  time: Date;
  estimatedDeliveryTime: number;
};

export const OrderStatusHeader = ({
  status,
  time,
  estimatedDeliveryTime,
}: Props) => {
  const expectedDelivery = useMemo(() => {
    const createdAt = new Date(time);

    createdAt.setMinutes(createdAt.getMinutes() + estimatedDeliveryTime);

    const hours = createdAt.getHours();
    const minutes = createdAt.getMinutes();

    const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `Today at ${hours}:${paddedMinutes}`;
  }, [estimatedDeliveryTime, time]);

  const orderStatus = useMemo(
    () =>
      ORDER_STATUS.find((orderValue) => orderValue.value === status) ||
      ORDER_STATUS[0],
    [status]
  );

  return (
    <>
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <h1 className="text-2xl font-semibold tracking-tight">
          Order Status: {orderStatus?.label}
        </h1>
        <h1 className="text-2xl font-semibold tracking-tight">
          Expected By: {expectedDelivery}
        </h1>
      </div>
      <Progress value={orderStatus?.progress} className="bg-gray-300" />
    </>
  );
};

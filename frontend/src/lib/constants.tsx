import { OrderStatusType } from "../types";

export const navOptions = [
  {
    name: "User Profile",
    link: "/user-profile",
  },
  {
    name: "Order Status",
    link: "/order-status",
  },
  {
    name: "My Restaurant",
    link: "/my-restaurant",
  },
];

export const ORDER_STATUS: OrderStatusType[] = [
  { label: "Placed", value: "placed", progress: 0 },
  { label: "Awaiting Restaurant Confirmation", value: "paid", progress: 25 },
  { label: "In Progress", value: "inProgress", progress: 50 },
  { label: "Out For Delivery", value: "outForDelivery", progress: 75 },
  { label: "Delivered", value: "delivered", progress: 100 },
];

import { toast } from "sonner";
import { useMutation, useQuery, useQueryClient } from "react-query";

import {
  getMyOrdersApi,
  createCheckoutSession,
  getMyRestaurantOrdersApi,
  updateOrderStatusApi,
} from "./api";

export const useCreateCheckoutSession = () => {
  const mutation = useMutation({
    mutationFn: createCheckoutSession,
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return mutation;
};

export const useGetMyOrders = () => {
  const query = useQuery({
    queryKey: ["get-my-orders"],
    queryFn: getMyOrdersApi,
  });

  return query;
};

export const useGetMyRestaurantOrders = () => {
  const query = useQuery({
    queryKey: ["get-my-restaurant-orders"],
    queryFn: getMyRestaurantOrdersApi,
  });

  return query;
};

export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: updateOrderStatusApi,
    onSuccess: () => {
      queryClient.invalidateQueries(["get-my-restaurant-orders"]);
      toast.success("Order status updated successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return mutation;
};

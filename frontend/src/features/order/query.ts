import { toast } from "sonner";
import { useMutation, useQuery } from "react-query";

import {
  getMyOrdersApi,
  createCheckoutSession,
  getMyRestaurantOrdersApi,
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

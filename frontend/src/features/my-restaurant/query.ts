import { toast } from "sonner";
import { useMutation, useQuery } from "react-query";

import { createRestaurantApi, getRestaurantApi } from "./api";

export const useCreateRestaurant = () => {
  const mutation = useMutation({
    mutationFn: createRestaurantApi,
    onSuccess: () => {
      toast.success("Hotel created successfully");
    },
    onError: (error: Error) => {
      toast.error(error?.message);
    },
  });

  return mutation;
};

export const useGetRestaurant = () => {
  const query = useQuery({
    queryKey: ["get-my-restaurant"],
    queryFn: getRestaurantApi,
  });

  return query;
};

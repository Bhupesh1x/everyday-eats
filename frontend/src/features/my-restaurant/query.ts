import { toast } from "sonner";
import { useMutation, useQuery, useQueryClient } from "react-query";

import {
  createRestaurantApi,
  getRestaurantApi,
  updateMyRestaurantApi,
} from "./api";

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

export const useUpdateRestaurant = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateMyRestaurantApi,
    onSuccess: () => {
      toast.success("Restaurant updated successfully");
      queryClient.invalidateQueries(["get-my-restaurant"]);
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return mutation;
};

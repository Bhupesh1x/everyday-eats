import { toast } from "sonner";
import { useMutation } from "react-query";

import { createRestaurantApi } from "./api";

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

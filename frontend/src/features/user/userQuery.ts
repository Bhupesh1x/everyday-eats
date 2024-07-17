import { useMutation, useQuery, useQueryClient } from "react-query";

import { getUserDetailsApi, updateUserDetailsApi } from "./userApi";
import { toast } from "sonner";

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateUserDetailsApi,
    onSuccess: () => {
      toast.success("User updated successfully");
      queryClient.invalidateQueries({ queryKey: ["get-user-details"] });
    },
    onError: (error: Error) => {
      toast.error(error?.message || "Something went wrong");
    },
  });

  return mutation;
};

export const useGetUserDetails = () => {
  const query = useQuery({
    queryKey: ["get-user-details"],
    queryFn: getUserDetailsApi,
  });

  return query;
};

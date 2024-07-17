import { toast } from "sonner";
import { useMutation, useQueryClient } from "react-query";

import { API_BASE_URL } from "../../../lib/utils";

export const useLogout = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(`${API_BASE_URL}/api/user/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        const res = await response.json();
        throw new Error(res?.message);
      }

      return await response.json();
    },
    onSuccess: () => {
      toast.success("Logged out successfull.");
      queryClient.invalidateQueries({ queryKey: ["get-session"] });
    },
    onError: (error: Error) => {
      toast.error(error?.message || "Someting went wrong");
    },
  });

  return mutation;
};

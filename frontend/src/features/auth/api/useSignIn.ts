import { toast } from "sonner";
import { useMutation } from "react-query";

import { API_BASE_URL } from "../../../lib/utils";

type RequestType = {
  email: string;
  password: string;
};

export const useSignIn = () => {
  const mutation = useMutation<string, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await fetch(`${API_BASE_URL}/api/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(json),
        credentials: "include",
      });

      if (!response.ok) {
        const res = await response.json();
        throw new Error(res?.message);
      }

      return await response.json();
    },
    onSuccess: () => {
      toast.success("Logged In successfull.");
    },
    onError: (error) => {
      toast.error(error?.message || "Someting went wrong");
    },
  });

  return mutation;
};

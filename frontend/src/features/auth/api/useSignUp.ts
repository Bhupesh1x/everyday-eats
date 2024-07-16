import { toast } from "sonner";
import { useMutation } from "react-query";

import { API_BASE_URL } from "../../../lib/utils";

type RequestType = {
  name: string;
  email: string;
  password: string;
};

export const useSignUp = () => {
  const mutation = useMutation<string, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await fetch(`${API_BASE_URL}/api/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(json),
      });

      if (!response.ok) {
        const res = await response.json();
        throw new Error(res?.message);
      }

      return await response.json();
    },
    onSuccess: () => {
      toast.success("User registered successfully.");
    },
    onError: (error) => {
      toast.error(error?.message || "Someting went wrong");
    },
  });

  return mutation;
};

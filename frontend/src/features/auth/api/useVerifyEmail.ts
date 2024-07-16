import { useMutation } from "react-query";

import { API_BASE_URL } from "../../../lib/utils";

type RequestType = {
  userId: string;
  token: string;
};

type ResponseType = {
  message: string;
};

export const useVerifyEmail = () => {
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await fetch(`${API_BASE_URL}/api/user/verify-email`, {
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
  });

  return mutation;
};

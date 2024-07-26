import { toast } from "sonner";
import { useMutation } from "react-query";

import { createCheckoutSession } from "./api";

export const useCreateCheckoutSession = () => {
  const mutation = useMutation({
    mutationFn: createCheckoutSession,
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return mutation;
};

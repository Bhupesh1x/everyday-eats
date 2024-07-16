import { useQuery } from "react-query";

import { API_BASE_URL } from "../../../lib/utils";

export const useGetSession = () => {
  const query = useQuery({
    queryKey: ["get-session"],
    queryFn: async () => {
      const res = await fetch(`${API_BASE_URL}/api/user/session`, {
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("Token Invalid");
      }

      return res.json();
    },
  });

  return query;
};

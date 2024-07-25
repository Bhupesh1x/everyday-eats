import { useQuery } from "react-query";

import { getRestaurantById } from "./api";

export const useGetRestaurantById = (id?: string) => {
  const query = useQuery({
    enabled: !!id,
    queryKey: ["get-restaurant", id],
    queryFn: () => getRestaurantById(id),
  });

  return query;
};

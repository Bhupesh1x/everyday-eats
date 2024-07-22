import { useQuery } from "react-query";
import { searchApi } from "./api";

export const useSearch = (city?: string) => {
  const query = useQuery({
    enabled: !!city,
    queryKey: ["search-restaurants"],
    queryFn: () => searchApi(city || ""),
  });

  return query;
};

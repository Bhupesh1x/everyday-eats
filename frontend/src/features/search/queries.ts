import { useQuery } from "react-query";

import { searchApi } from "./api";
import { SearchState } from "../../pages/SearchPage";

export const useSearch = (city?: string, searchState?: SearchState) => {
  const query = useQuery({
    enabled: !!city,
    queryKey: ["search-restaurants", searchState],
    queryFn: () => searchApi(city || "", searchState),
  });

  return query;
};

import { API_BASE_URL } from "../../lib/utils";
import { SearchState } from "../../pages/SearchPage";

import { SearchRestaurantResponse } from "../../types";

export const searchApi = async (
  city: string,
  searchState?: SearchState
): Promise<SearchRestaurantResponse> => {
  const params = new URLSearchParams();
  params.set("search", searchState?.search || "");
  params.set("page", searchState?.page?.toString() || "");
  params.set("cuisines", searchState?.selectedCuisines?.join(",") || "");

  const res = await fetch(
    `${API_BASE_URL}/api/restaurant/search/${city}?${params.toString()}`
  );

  if (!res.ok) {
    throw new Error("Failed to get restaurants");
  }

  return await res.json();
};

import { API_BASE_URL } from "../../lib/utils";

import { SearchRestaurantResponse } from "../../types";

export const searchApi = async (
  city: string
): Promise<SearchRestaurantResponse> => {
  const res = await fetch(`${API_BASE_URL}/api/restaurant/search/${city}`);

  if (!res.ok) {
    throw new Error("Failed to get restaurants");
  }

  return await res.json();
};

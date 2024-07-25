import { RestaurantType } from "../../types";
import { API_BASE_URL } from "../../lib/utils";

export const getRestaurantById = async (
  id?: string
): Promise<RestaurantType> => {
  const res = await fetch(`${API_BASE_URL}/api/restaurant/${id}`);

  if (!res.ok) {
    throw new Error("Error while fetching restaurant details");
  }

  return await res.json();
};

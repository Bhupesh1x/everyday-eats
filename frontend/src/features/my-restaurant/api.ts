import { API_BASE_URL } from "../../lib/utils";

export const createRestaurantApi = async (data: FormData) => {
  const res = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
    method: "POST",
    credentials: "include",
    body: data,
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error?.message);
  }

  return await res.json();
};

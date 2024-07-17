import { UserType } from "../../types";
import { UpdateUserRequest } from "./types";
import { API_BASE_URL } from "../../lib/utils";

export const updateUserDetailsApi = async (data: UpdateUserRequest) => {
  const res = await fetch(`${API_BASE_URL}/api/user/update-user`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Methods": "GET, HEAD, POST, PUT, DELETE, OPTIONS",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Error updating user information");
  }

  return await res.json();
};

export const getUserDetailsApi = async (): Promise<UserType> => {
  const res = await fetch(`${API_BASE_URL}/api/user/me`, {
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Error fetching user info");
  }

  return await res.json();
};

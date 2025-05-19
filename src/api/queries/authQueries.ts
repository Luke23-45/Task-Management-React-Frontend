import api from "../index";
import { type User } from "@/types/auth";

export const fetchUserProfile = async (): Promise<User> => {
  const response = await api.get<User>("/users/me/");

  return response.data;
};

import api from "../index";
import {
  type User,
  type AuthTokens,
  type LoginCredentials,
  type RegisterPayload,
} from "@/types/auth";

export const loginUser = async (
  credentials: LoginCredentials
): Promise<AuthTokens> => {
  const response = await api.post<AuthTokens>("/users/login/", credentials);

  return response.data;
};

export const registerUser = async (
  userData: RegisterPayload
): Promise<User> => {
  const response = await api.post<User>("/users/register/", userData);
  return response.data;
};

interface RefreshTokenPayload {
  refresh: string;
}

export const refreshToken = async (
  payload: RefreshTokenPayload
): Promise<AuthTokens> => {
  console.log("Attempting to refresh token...");
  const response = await api.post<AuthTokens>("/users/login/refresh/", payload);

  return response.data;
};

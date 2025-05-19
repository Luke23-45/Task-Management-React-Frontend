// src/types/auth.d.ts

export interface AuthTokens {
  access: string;
  refresh: string;
}

export interface User {
  id: number;
  full_name: string;
  email: string;
}

export interface LoginCredentials {
  username: string; 
  password: string;
}

export interface RegisterPayload {
  full_name: string;
  email: string;
  password: string;
}



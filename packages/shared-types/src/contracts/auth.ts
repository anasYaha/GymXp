import type { User } from "../entities/brand";

export interface AuthResponse {
  token: string;
  user: User;
}

export interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
  brandId?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthMeResponse {
  user: User;
}

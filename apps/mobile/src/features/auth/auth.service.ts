import type {
  AuthMeResponse,
  AuthResponse,
  LoginRequest,
  RegisterRequest
} from "@gymxp/shared-types/contracts/auth";

import { apiClient } from "../../services/api/api-client";

export const authService = {
  register(input: RegisterRequest) {
    return apiClient.request<AuthResponse>("/auth/register", {
      method: "POST",
      body: JSON.stringify(input)
    });
  },

  login(input: LoginRequest) {
    return apiClient.request<AuthResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify(input)
    });
  },

  me(token: string) {
    return apiClient.request<AuthMeResponse>("/auth/me", {
      method: "GET",
      token
    });
  }
};

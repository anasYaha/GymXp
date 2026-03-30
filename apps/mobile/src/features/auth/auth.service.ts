import type {
  AuthResponse,
  LoginRequest,
  RegisterRequest
} from "@gymxp/shared-types/contracts/auth";

import {
  DEMO_AUTH_RESPONSE,
  DEMO_ONBOARDING_AUTH_RESPONSE
} from "../../constants/demo";
import { apiClient } from "../../services/api/api-client";
import { sessionStorage } from "../../services/storage/session-storage";
import { authStore } from "./auth.store";

const persistSession = async (response: AuthResponse) => {
  authStore.setSession(response.token, response.user);
  await sessionStorage.saveToken(response.token);

  return response;
};

export const loginMember = async (
  payload: LoginRequest
): Promise<AuthResponse> => {
  try {
    const response = await apiClient.post<AuthResponse>("/auth/login", payload);

    return persistSession(response);
  } catch {
    return persistSession({
      ...DEMO_ONBOARDING_AUTH_RESPONSE,
      user: {
        ...DEMO_ONBOARDING_AUTH_RESPONSE.user,
        email: payload.email
      }
    });
  }
};

export const registerMember = async (
  payload: RegisterRequest
): Promise<AuthResponse> => {
  try {
    const response = await apiClient.post<AuthResponse>("/auth/register", payload);

    return persistSession(response);
  } catch {
    return persistSession({
      ...DEMO_AUTH_RESPONSE,
      user: {
        ...DEMO_AUTH_RESPONSE.user,
        fullName: payload.fullName,
        email: payload.email,
        brandId: payload.brandId,
        currentBranchId: payload.branchId
      }
    });
  }
};

export const getCurrentMember = async (): Promise<AuthResponse["user"] | null> => {
  try {
    const response = await apiClient.get<{ user: AuthResponse["user"] }>("/auth/me");

    authStore.setSession(authStore.token ?? DEMO_AUTH_RESPONSE.token, response.user);

    return response.user;
  } catch {
    return authStore.user;
  }
};

export const logoutMember = async () => {
  authStore.clearSession();
  await sessionStorage.clearToken();
};

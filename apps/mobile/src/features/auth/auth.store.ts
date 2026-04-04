import type { User } from "@gymxp/shared-types/entities/brand";

export interface AuthSessionState {
  token: string | null;
  user: User | null;
  status: "booting" | "guest" | "authenticated";
  initialized: boolean;
}

export const authStore: AuthSessionState = {
  token: null,
  user: null,
  status: "booting",
  initialized: false
};

export const setAuthStore = (nextState: Partial<AuthSessionState>) => {
  Object.assign(authStore, nextState);
};

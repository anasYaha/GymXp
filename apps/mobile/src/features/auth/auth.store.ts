import type { User } from "@gymxp/shared-types/entities/brand";

export interface AuthSessionState {
  token: string | null;
  user: User | null;
  status: "booting" | "guest" | "authenticated";
  initialized: boolean;
}

interface AuthStore extends AuthSessionState {
  setSession: (token: string, user: User) => void;
  clearSession: () => void;
  setCurrentBranchId: (branchId: string) => void;
}

export const authStore: AuthStore = {
  token: null,
  user: null,
  status: "booting",
  initialized: false,
  setSession(token: string, user: User) {
    authStore.token = token;
    authStore.user = user;
    authStore.status = "authenticated";
    authStore.initialized = true;
  },
  clearSession() {
    authStore.token = null;
    authStore.user = null;
    authStore.status = "guest";
    authStore.initialized = true;
  },
  setCurrentBranchId(branchId: string) {
    if (!authStore.user) {
      return;
    }

    authStore.user = {
      ...authStore.user,
      currentBranchId: branchId
    };
  }
};

export const setAuthStore = (nextState: Partial<AuthSessionState>) => {
  Object.assign(authStore, nextState);
};

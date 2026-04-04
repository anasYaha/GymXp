import type { User } from "@gymxp/shared-types/entities/brand";

<<<<<<< HEAD
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
=======
export const authStore: {
  token: string | null;
  user: User | null;
  status: "idle" | "loading" | "authenticated";
  setSession: (token: string, user: User) => void;
  clearSession: () => void;
  setCurrentBranchId: (branchId: string) => void;
} = {
  token: null,
  user: null,
  status: "idle",
  setSession(token: string, user: User) {
    authStore.token = token;
    authStore.user = user;
    authStore.status = "authenticated";
  },
  clearSession() {
    authStore.token = null;
    authStore.user = null;
    authStore.status = "idle";
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

>>>>>>> 19a8392d8b9fce35da33f576904dc6c15d161402

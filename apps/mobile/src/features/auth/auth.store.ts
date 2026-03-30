import type { User } from "@gymxp/shared-types/entities/brand";

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


import type { User } from "@gymxp/shared-types/entities/brand";

export interface AuthSessionState {
  token: string | null;
  user: User | null;
  status: "booting" | "guest" | "authenticated";
}

export const authStore: AuthSessionState = {
  token: null,
  user: null,
  status: "booting"
};

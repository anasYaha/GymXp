<<<<<<< HEAD
import type { AuthChangeEvent, Session, User as SupabaseAuthUser } from "@supabase/supabase-js";
import type { LoginRequest, RegisterRequest } from "@gymxp/shared-types/contracts/auth";
import type { User } from "@gymxp/shared-types/entities/brand";
import { UserRole } from "@gymxp/shared-types/enums/roles";

import { supabase } from "../../lib/supabase";

type ProfileRow = {
  id: string;
  email: string | null;
  full_name: string | null;
  role: string | null;
  created_at: string | null;
  updated_at: string | null;
};

const PROFILE_SELECT = "id, email, full_name, role, created_at, updated_at";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const normalizeAuthMessage = (message: string) => {
  const normalized = message.toLowerCase();

  if (normalized.includes("invalid login credentials")) {
    return "Invalid email or password.";
  }

  if (normalized.includes("email not confirmed")) {
    return "Check your inbox and confirm your email before signing in.";
  }

  if (normalized.includes("user already registered")) {
    return "An account with this email already exists.";
  }

  if (normalized.includes("password should be at least")) {
    return "Password must be at least 6 characters.";
  }

  return message;
};

const toErrorMessage = (error: unknown, fallback: string) => {
  if (error instanceof Error && error.message.trim()) {
    return normalizeAuthMessage(error.message);
  }

  return fallback;
};

const isUserRole = (value: string | null | undefined): value is UserRole => {
  return value === UserRole.MEMBER || value === UserRole.BRANCH_ADMIN || value === UserRole.BRAND_OWNER || value === UserRole.PLATFORM_ADMIN;
};

const mapProfileUser = (authUser: SupabaseAuthUser, profile: ProfileRow | null): User => {
  const metadataFullName = typeof authUser.user_metadata.full_name === "string" ? authUser.user_metadata.full_name.trim() : "";
  const fullName = profile?.full_name?.trim() || metadataFullName || authUser.email?.split("@")[0] || "GymXP Member";
  const createdAt = profile?.created_at ?? authUser.created_at ?? new Date().toISOString();
  const updatedAt = profile?.updated_at ?? authUser.updated_at ?? createdAt;

  return {
    id: authUser.id,
    fullName,
    email: authUser.email ?? profile?.email ?? "",
    brandId: null,
    currentBranchId: null,
    role: isUserRole(profile?.role) ? profile.role : UserRole.MEMBER,
    createdAt,
    updatedAt
  };
};

const fetchProfile = async (userId: string) => {
  const { data, error } = await supabase.from("profiles").select(PROFILE_SELECT).eq("id", userId).maybeSingle<ProfileRow>();

  if (error) {
    throw new Error(normalizeAuthMessage(error.message));
  }

  return data;
};

const fetchProfileWithRetry = async (userId: string, attempts = 4) => {
  for (let attempt = 0; attempt < attempts; attempt += 1) {
    const profile = await fetchProfile(userId);

    if (profile) {
      return profile;
    }

    if (attempt < attempts - 1) {
      await delay(250 * (attempt + 1));
    }
  }

  return null;
};

const requireSession = (session: Session | null, fallbackMessage: string) => {
  if (!session?.user) {
    throw new Error(fallbackMessage);
  }

  return session;
};

export const authService = {
  async getSession() {
    const { data, error } = await supabase.auth.getSession();

    if (error) {
      throw new Error(toErrorMessage(error, "Unable to restore your session."));
    }

    return data.session;
  },

  onAuthStateChange(callback: (event: AuthChangeEvent, session: Session | null) => void) {
    return supabase.auth.onAuthStateChange(callback);
  },

  async hydrateSession(session: Session) {
    const activeSession = requireSession(session, "Your session is no longer available. Please sign in again.");
    const profile = await fetchProfileWithRetry(activeSession.user.id);

    return {
      token: activeSession.access_token,
      user: mapProfileUser(activeSession.user, profile)
    };
  },

  async signUp(input: RegisterRequest) {
    const { data, error } = await supabase.auth.signUp({
      email: input.email.trim(),
      password: input.password,
      options: {
        data: {
          full_name: input.fullName.trim()
        }
      }
    });

    if (error) {
      throw new Error(toErrorMessage(error, "Unable to create your account."));
    }

    const authUser = data.user;

    if (!authUser) {
      throw new Error("Supabase did not return a user for this signup attempt.");
    }

    if (!data.session) {
      return {
        session: null,
        user: null,
        requiresEmailConfirmation: true
      };
    }

    const hydrated = await authService.hydrateSession(data.session);

    return {
      session: data.session,
      user: hydrated.user,
      requiresEmailConfirmation: false
    };
  },

  async login(input: LoginRequest) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: input.email.trim(),
      password: input.password
    });

    if (error) {
      throw new Error(toErrorMessage(error, "Unable to sign in."));
    }

    const session = requireSession(data.session, "Supabase did not return an active session for this login.");
    const hydrated = await authService.hydrateSession(session);

    return {
      session,
      user: hydrated.user
    };
  },

  async logout() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      throw new Error(toErrorMessage(error, "Unable to sign out right now."));
    }
  }
};
=======
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
>>>>>>> 19a8392d8b9fce35da33f576904dc6c15d161402

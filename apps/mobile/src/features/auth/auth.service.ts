import type { AuthResponse, LoginRequest, RegisterRequest } from "@gymxp/shared-types/contracts/auth";
import type { User } from "@gymxp/shared-types/entities/brand";

import { apiClient } from "../../services/api/api-client";

type Session = {
  access_token: string;
};

type AuthChangeEvent = "SIGNED_IN" | "SIGNED_OUT" | "TOKEN_REFRESHED";

const SESSION_STORAGE_KEY = "@gymxp_session_token";

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

const listeners = new Set<(event: AuthChangeEvent, session: Session | null) => void>();

const getStorage = async () => (await import("@react-native-async-storage/async-storage")).default;

const emitAuthEvent = (event: AuthChangeEvent, session: Session | null) => {
  listeners.forEach((listener) => listener(event, session));
};

const persistSessionToken = async (token: string | null) => {
  const storage = await getStorage();

  if (token) {
    await storage.setItem(SESSION_STORAGE_KEY, token);
    return;
  }

  await storage.removeItem(SESSION_STORAGE_KEY);
};

const requireSession = (session: Session | null, fallbackMessage: string) => {
  if (!session?.access_token) {
    throw new Error(fallbackMessage);
  }

  return session;
};

export const authService = {
  async getSession() {
    try {
      const storage = await getStorage();
      const token = await storage.getItem(SESSION_STORAGE_KEY);
      return token ? { access_token: token } : null;
    } catch (error) {
      throw new Error(toErrorMessage(error, "Unable to restore your session."));
    }
  },

  onAuthStateChange(callback: (event: AuthChangeEvent, session: Session | null) => void) {
    listeners.add(callback);

    return {
      data: {
        subscription: {
          unsubscribe() {
            listeners.delete(callback);
          }
        }
      }
    };
  },

  async hydrateSession(session: Session) {
    const activeSession = requireSession(
      session,
      "Your session is no longer available. Please sign in again."
    );

    const response = await fetch(`${apiClient.baseUrl}/auth/me`, {
      headers: {
        Authorization: `Bearer ${activeSession.access_token}`
      }
    });

    if (!response.ok) {
      throw new Error("Unable to restore your GymXP account.");
    }

    const userResponse = (await response.json()) as { user: User };

    return {
      token: activeSession.access_token,
      user: userResponse.user
    };
  },

  async signUp(input: RegisterRequest) {
    try {
      const response = await apiClient.post<AuthResponse>("/auth/register", input);
      await persistSessionToken(response.token);
      const session = { access_token: response.token };

      return {
        session,
        user: response.user,
        requiresEmailConfirmation: false
      };
    } catch (error) {
      throw new Error(toErrorMessage(error, "Unable to create your account."));
    }
  },

  async login(input: LoginRequest) {
    try {
      const response = await apiClient.post<AuthResponse>("/auth/login", input);
      await persistSessionToken(response.token);
      const session = { access_token: response.token };

      return {
        session,
        user: response.user
      };
    } catch (error) {
      throw new Error(toErrorMessage(error, "Unable to sign in."));
    }
  },

  async logout() {
    await persistSessionToken(null);
  }
};

export const getCurrentMember = async (): Promise<User | null> => {
  const session = await authService.getSession();

  if (!session) {
    return null;
  }

  const hydrated = await authService.hydrateSession(session);

  return hydrated.user;
};

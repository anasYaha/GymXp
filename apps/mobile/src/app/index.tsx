import type { DashboardSummaryResponse } from "@gymxp/shared-types/contracts/dashboard";
import type { MemberSession } from "@gymxp/shared-types/contracts/sessions";
import type { User } from "@gymxp/shared-types/entities/brand";
import type { RegisterRequest } from "@gymxp/shared-types/contracts/auth";
import type { Session } from "@supabase/supabase-js";
import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";

import { authService } from "../features/auth/auth.service";
import { setAuthStore } from "../features/auth/auth.store";
import { getDashboardSummary } from "../features/dashboard/dashboard.service";
import { checkInToSession, listAvailableSessions } from "../features/session/session.service";
import { DashboardScreen } from "../screens/dashboard/dashboard-screen";
import { LoginScreen } from "../screens/auth/login-screen";
import { RegisterScreen } from "../screens/auth/register-screen";

type AuthMode = "login" | "register";

const logAuth = (event: string, data?: Record<string, unknown>) => {
  if (__DEV__) {
    console.info(`[auth] ${event}`, data ?? {});
  }
};

const getErrorMessage = (error: unknown, fallback = "Something went wrong.") => {
  return error instanceof Error && error.message.trim() ? error.message : fallback;
};

export const MobileAppRoot = () => {
  const [authMode, setAuthMode] = useState<AuthMode>("login");
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [summary, setSummary] = useState<DashboardSummaryResponse | null>(null);
  const [sessionOptions, setSessionOptions] = useState<MemberSession[]>([]);
  const [booting, setBooting] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [checkingInSessionId, setCheckingInSessionId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const submittingRef = useRef(false);

  const clearAuthenticatedState = () => {
    setToken(null);
    setUser(null);
    setSummary(null);
    setSessionOptions([]);
    setAuthStore({
      token: null,
      user: null,
      status: "guest",
      initialized: true
    });
  };

  const applyAuthenticatedState = (nextToken: string, nextUser: User) => {
    setToken(nextToken);
    setUser(nextUser);
    setAuthStore({
      token: nextToken,
      user: nextUser,
      status: "authenticated",
      initialized: true
    });

    logAuth("session-ready", {
      userId: nextUser.id
    });
  };

  const loadMemberData = async (currentUser: User) => {
    const [nextSummary, nextSessions] = await Promise.all([
      getDashboardSummary(currentUser),
      listAvailableSessions()
    ]);

    setSummary(nextSummary);
    setSessionOptions(nextSessions.items);
  };

  const syncSession = async (session: Session | null, options?: { preloadedUser?: User | null }) => {
    if (!session) {
      clearAuthenticatedState();
      return;
    }

    setError(null);
    setNotice(null);
    setSummary(null);
    setSessionOptions([]);

    const hydrated = options?.preloadedUser
      ? {
          token: session.access_token,
          user: options.preloadedUser
        }
      : await authService.hydrateSession(session);

    applyAuthenticatedState(hydrated.token, hydrated.user);
    await loadMemberData(hydrated.user);
  };

  useEffect(() => {
    let isMounted = true;

    const bootstrap = async () => {
      try {
        setAuthStore({
          token: null,
          user: null,
          status: "booting",
          initialized: false
        });

        const existingSession = await authService.getSession();

        if (!isMounted) {
          return;
        }

        if (existingSession?.user) {
          logAuth("bootstrap-start", {
            userId: existingSession.user.id
          });
        }

        await syncSession(existingSession);
      } catch (nextError) {
        if (!isMounted) {
          return;
        }

        clearAuthenticatedState();
        setError(getErrorMessage(nextError, "Unable to restore your GymXP session."));
      } finally {
        if (isMounted) {
          setBooting(false);
        }
      }
    };

    const {
      data: { subscription }
    } = authService.onAuthStateChange((event, nextSession) => {
      if (!isMounted) {
        return;
      }

      logAuth("auth-state-change", {
        event,
        hasSession: Boolean(nextSession)
      });

      void syncSession(nextSession).catch((nextError) => {
        if (isMounted) {
          setError(getErrorMessage(nextError, "Unable to refresh your GymXP data."));
        }
      }).finally(() => {
        if (isMounted) {
          setBooting(false);
        }
      });
    });

    void bootstrap();

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const withSubmit = async (callback: () => Promise<void>) => {
    if (submittingRef.current) {
      return;
    }

    submittingRef.current = true;
    setSubmitting(true);
    setError(null);
    setNotice(null);

    try {
      await callback();
    } catch (nextError) {
      const message = getErrorMessage(nextError);
      logAuth("submit-failed", {
        message
      });
      setError(message);
    } finally {
      submittingRef.current = false;
      setSubmitting(false);
    }
  };

  const handleRegister = async (input: RegisterRequest) =>
    withSubmit(async () => {
      logAuth("register-submit", {
        email: input.email
      });

      const response = await authService.signUp(input);

      if (response.requiresEmailConfirmation || !response.session || !response.user) {
        setAuthMode("login");
        setNotice("Account created. Check your email for the confirmation link before signing in.");
        return;
      }

      await syncSession(response.session, {
        preloadedUser: response.user
      });

      logAuth("register-success", {
        userId: response.user.id
      });
    });

  const handleLogin = async (input: { email: string; password: string }) =>
    withSubmit(async () => {
      logAuth("login-submit", {
        email: input.email
      });

      const response = await authService.login(input);
      await syncSession(response.session, {
        preloadedUser: response.user
      });

      logAuth("login-success", {
        userId: response.user.id
      });
    });

  const handleCheckIn = async (sessionId: string) => {
    if (!user) {
      throw new Error("Missing session user.");
    }

    setCheckingInSessionId(sessionId);
    setError(null);
    setNotice(null);

    try {
      const result = await checkInToSession(sessionId);
      await loadMemberData(user);

      setNotice(
        result.xpAwarded > 0
          ? `Checked in successfully. +${result.xpAwarded} XP added.`
          : "You were already checked in to that session."
      );
    } catch (nextError) {
      setError(getErrorMessage(nextError));
    } finally {
      setCheckingInSessionId(null);
    }
  };

  const handleLogout = async () => {
    setError(null);
    setNotice(null);

    try {
      await authService.logout();
    } finally {
      clearAuthenticatedState();
      setAuthMode("login");
    }
  };

  if (booting) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          gap: 12,
          backgroundColor: "#f6f5f0"
        }}
      >
        <ActivityIndicator size="large" color="#144E45" />
        <Text>Loading GymXP...</Text>
      </View>
    );
  }

  if (!token || !user) {
    return authMode === "login" ? (
      <LoginScreen
        error={error}
        loading={submitting}
        notice={notice}
        onLogin={handleLogin}
        onShowRegister={() => {
          if (submittingRef.current) {
            return;
          }

          setError(null);
          setNotice(null);
          setAuthMode("register");
        }}
      />
    ) : (
      <RegisterScreen
        error={error}
        loading={submitting}
        notice={notice}
        onRegister={handleRegister}
        onShowLogin={() => {
          if (submittingRef.current) {
            return;
          }

          setError(null);
          setNotice(null);
          setAuthMode("login");
        }}
      />
    );
  }

  if (!summary) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          gap: 12,
          backgroundColor: "#f6f5f0"
        }}
      >
        <ActivityIndicator size="large" color="#144E45" />
        <Text>Loading dashboard...</Text>
      </View>
    );
  }

  return (
    <DashboardScreen
      checkingInSessionId={checkingInSessionId}
      onCheckIn={handleCheckIn}
      onLogout={handleLogout}
      sessionError={error ?? notice}
      sessions={sessionOptions}
      summary={summary}
    />
  );
};

export default MobileAppRoot;

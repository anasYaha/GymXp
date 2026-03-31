import type { DashboardSummaryResponse } from "@gymxp/shared-types/contracts/dashboard";
import type { BranchSessionOption } from "@gymxp/shared-types/contracts/sessions";
import type { User } from "@gymxp/shared-types/entities/brand";
import type { RegisterRequest } from "@gymxp/shared-types/contracts/auth";
import type { GymBranch } from "@gymxp/shared-types/entities/brand";
import { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";

import { authService } from "../features/auth/auth.service";
import { branchService } from "../features/branch/branch.service";
import { getDashboardSummary } from "../features/dashboard/dashboard.service";
import { checkInToSession, listAvailableSessions } from "../features/session/session.service";
import { sessionStorage } from "../services/storage/session-storage";
import { DashboardScreen } from "../screens/dashboard/dashboard-screen";
import { LoginScreen } from "../screens/auth/login-screen";
import { RegisterScreen } from "../screens/auth/register-screen";
import { BranchSelectionScreen } from "../screens/onboarding/branch-selection-screen";

type AuthMode = "login" | "register";

export const MobileAppRoot = () => {
  const [authMode, setAuthMode] = useState<AuthMode>("login");
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [branches, setBranches] = useState<GymBranch[]>([]);
  const [summary, setSummary] = useState<DashboardSummaryResponse | null>(null);
  const [sessionOptions, setSessionOptions] = useState<BranchSessionOption[]>([]);
  const [booting, setBooting] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [checkingInSessionId, setCheckingInSessionId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const persistSession = async (nextToken: string, nextUser: User) => {
    setToken(nextToken);
    setUser(nextUser);
    await sessionStorage.saveToken(nextToken);
    await sessionStorage.saveUser(nextUser);
  };

  const loadBranches = async (nextToken: string) => {
    const response = await branchService.list(nextToken);
    setBranches(response.items);
  };

  const loadDashboardData = async (nextToken: string) => {
    const [nextSummary, nextSessionOptions] = await Promise.all([
      getDashboardSummary(nextToken),
      listAvailableSessions(nextToken)
    ]);

    setSummary(nextSummary);
    setSessionOptions(nextSessionOptions.items);
  };

  useEffect(() => {
    const bootstrap = async () => {
      try {
        const storedToken = await sessionStorage.getToken();
        const storedUser = await sessionStorage.getUser<User>();

        if (!storedToken || !storedUser) {
          setBooting(false);
          return;
        }

        const me = await authService.me(storedToken);
        await persistSession(storedToken, me.user);
        await loadBranches(storedToken);

        if (me.user.currentBranchId) {
          await loadDashboardData(storedToken);
        }
      } catch {
        await sessionStorage.clear();
      } finally {
        setBooting(false);
      }
    };

    void bootstrap();
  }, []);

  const withSubmit = async (callback: () => Promise<void>) => {
    setSubmitting(true);
    setError(null);

    try {
      await callback();
    } catch (nextError) {
      setError(nextError instanceof Error ? nextError.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleRegister = async (input: RegisterRequest) =>
    withSubmit(async () => {
      const response = await authService.register(input);
      await persistSession(response.token, response.user);
      await loadBranches(response.token);
      setSummary(null);
      setSessionOptions([]);
    });

  const handleLogin = async (input: { email: string; password: string }) =>
    withSubmit(async () => {
      const response = await authService.login(input);
      await persistSession(response.token, response.user);
      await loadBranches(response.token);

      if (response.user.currentBranchId) {
        await loadDashboardData(response.token);
      } else {
        setSummary(null);
        setSessionOptions([]);
      }
    });

  const handleSelectBranch = async (branchId: string) =>
    withSubmit(async () => {
      if (!token) {
        throw new Error("Missing session.");
      }

      const response = await branchService.select(token, branchId);
      await persistSession(response.token, response.user);
      await loadDashboardData(response.token);
    });

  const handleCheckIn = async (sessionId: string) => {
    if (!token) {
      throw new Error("Missing session.");
    }

    setCheckingInSessionId(sessionId);
    setError(null);

    try {
      await checkInToSession(token, sessionId);
      await loadDashboardData(token);
    } catch (nextError) {
      setError(nextError instanceof Error ? nextError.message : "Something went wrong.");
    } finally {
      setCheckingInSessionId(null);
    }
  };

  const handleLogout = async () => {
    await sessionStorage.clear();
    setToken(null);
    setUser(null);
    setBranches([]);
    setSummary(null);
    setSessionOptions([]);
    setAuthMode("login");
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
        onLogin={handleLogin}
        onShowRegister={() => {
          setError(null);
          setAuthMode("register");
        }}
      />
    ) : (
      <RegisterScreen
        error={error}
        loading={submitting}
        onRegister={handleRegister}
        onShowLogin={() => {
          setError(null);
          setAuthMode("login");
        }}
      />
    );
  }

  if (!user.currentBranchId) {
    return (
      <BranchSelectionScreen
        branches={branches}
        error={error}
        loading={submitting}
        onSubmit={handleSelectBranch}
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
      sessionError={error}
      sessions={sessionOptions}
      summary={summary}
    />
  );
};

export default MobileAppRoot;

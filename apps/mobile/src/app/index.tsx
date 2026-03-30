import { authStore } from "../features/auth/auth.store";
import { resolveMemberInitialRoute } from "../navigation/app-navigator";
import { BranchSelectionScreen } from "../screens/onboarding/branch-selection-screen";
import { DashboardScreen } from "../screens/dashboard/dashboard-screen";

export const MobileAppRoot = async () => {
  const initialRoute = resolveMemberInitialRoute({
    isAuthenticated: authStore.status === "authenticated",
    currentBranchId: authStore.user?.currentBranchId ?? null
  });

  if (initialRoute === "onboarding-branch") {
    return BranchSelectionScreen();
  }

  if (initialRoute === "dashboard-home") {
    return DashboardScreen();
  }

  return {
    route: initialRoute,
    status: "pending-auth"
  };
};


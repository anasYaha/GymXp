export const memberRoutes = [
  "login",
<<<<<<< HEAD
  "onboarding-profile-info",
  "onboarding-fitness-info",
  "onboarding-avatar-setup",
=======
  "onboarding-branch",
>>>>>>> 19a8392d8b9fce35da33f576904dc6c15d161402
  "dashboard-home",
  "session-create",
  "leaderboard",
  "profile",
  "settings"
] as const;
<<<<<<< HEAD
=======

export type MemberRoute = (typeof memberRoutes)[number];

export interface ResolveMemberRouteInput {
  isAuthenticated: boolean;
  currentBranchId: string | null;
}

export const resolveMemberInitialRoute = ({
  isAuthenticated,
  currentBranchId
}: ResolveMemberRouteInput): MemberRoute => {
  if (!isAuthenticated) {
    return "login";
  }

  if (!currentBranchId) {
    return "onboarding-branch";
  }

  return "dashboard-home";
};

>>>>>>> 19a8392d8b9fce35da33f576904dc6c15d161402

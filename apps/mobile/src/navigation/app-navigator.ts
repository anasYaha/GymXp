export const memberRoutes = [
  "login",
  "onboarding-branch",
  "onboarding-profile-info",
  "onboarding-fitness-info",
  "onboarding-avatar-setup",
  "dashboard-home",
  "session-create",
  "leaderboard",
  "profile",
  "settings"
] as const;

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

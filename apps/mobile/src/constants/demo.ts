import type { DashboardSummaryResponse } from "@gymxp/shared-types/contracts/dashboard";
import type { AuthResponse } from "@gymxp/shared-types/contracts/auth";
import type { GymBranch } from "@gymxp/shared-types/entities/brand";
import { UserRole } from "@gymxp/shared-types/enums/roles";

export const DEMO_BRAND_NAME = "Gym City Tunisia";
export const DEMO_BRAND_ID = "brand_gym_city";
export const DEMO_BRANCH_NAME = "Gym City Sousse";
export const DEMO_BRANCH_ID = "branch_sousse";

export const DEMO_BRANCHES: GymBranch[] = [
  {
    id: "branch_tunis",
    brandId: DEMO_BRAND_ID,
    name: "Gym City Tunis",
    city: "Tunis",
    address: "Centre Urbain Nord",
    createdAt: "2026-03-01T08:00:00.000Z",
    updatedAt: "2026-03-01T08:00:00.000Z"
  },
  {
    id: DEMO_BRANCH_ID,
    brandId: DEMO_BRAND_ID,
    name: DEMO_BRANCH_NAME,
    city: "Sousse",
    address: "Boulevard du 14 Janvier",
    createdAt: "2026-03-01T08:00:00.000Z",
    updatedAt: "2026-03-01T08:00:00.000Z"
  },
  {
    id: "branch_lac",
    brandId: DEMO_BRAND_ID,
    name: "Gym City Lac",
    city: "Tunis",
    address: "Lac 2",
    createdAt: "2026-03-01T08:00:00.000Z",
    updatedAt: "2026-03-01T08:00:00.000Z"
  }
];

export const DEMO_AUTH_RESPONSE: AuthResponse = {
  token: "gymxp-demo-token",
  user: {
    id: "user_ali_ben_salah",
    fullName: "Ali Ben Salah",
    email: "ali@example.com",
    brandId: DEMO_BRAND_ID,
    currentBranchId: DEMO_BRANCH_ID,
    role: UserRole.MEMBER,
    createdAt: "2026-03-01T08:00:00.000Z",
    updatedAt: "2026-03-30T08:00:00.000Z"
  }
};

export const DEMO_DASHBOARD_SUMMARY: DashboardSummaryResponse = {
  member: {
    firstName: "Ali"
  },
  activeBranch: {
    id: DEMO_BRANCH_ID,
    name: DEMO_BRANCH_NAME,
    city: "Sousse"
  },
  xp: 420,
  streakDays: 6,
  rank: 4,
  todayInThisGym: {
    activeMembers: 27,
    peakWindow: "18:00-20:00"
  }
};


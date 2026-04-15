import type { DashboardSummaryResponse } from "@gymxp/shared-types/contracts/dashboard";
import type { AuthResponse } from "@gymxp/shared-types/contracts/auth";
import type {
  LeaderboardResponse,
  MyLeaderboardResponse
} from "@gymxp/shared-types/contracts/leaderboard";
import type {
  CreateSessionRequest,
  MemberSession
} from "@gymxp/shared-types/contracts/sessions";
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
    level: 2,
    totalXp: 420,
    totalSessions: 18,
    currentStreak: 6,
    levelXpProgress: 20,
    levelDaysProgress: 0,
    age: null,
    avatarUrl: null,
    createdAt: "2026-03-01T08:00:00.000Z",
    updatedAt: "2026-03-30T08:00:00.000Z"
  }
};

export const DEMO_DASHBOARD_SUMMARY: DashboardSummaryResponse = {
  user: {
    id: DEMO_AUTH_RESPONSE.user.id,
    fullName: DEMO_AUTH_RESPONSE.user.fullName,
    email: DEMO_AUTH_RESPONSE.user.email,
    level: DEMO_AUTH_RESPONSE.user.level,
    totalXp: DEMO_AUTH_RESPONSE.user.totalXp,
    totalSessions: DEMO_AUTH_RESPONSE.user.totalSessions,
    currentStreak: DEMO_AUTH_RESPONSE.user.currentStreak,
    levelXpProgress: DEMO_AUTH_RESPONSE.user.levelXpProgress,
    levelDaysProgress: DEMO_AUTH_RESPONSE.user.levelDaysProgress
  },
  gym: {
    id: DEMO_BRANCH_ID,
    name: DEMO_BRANCH_NAME,
    city: "Sousse"
  },
  stats: {
    xp: 420,
    streak: 6,
    checkIns: 18
  },
  progress: {
    currentLevel: 2,
    nextLevel: 3,
    xpInLevel: 20,
    xpRequiredForNextLevel: 200,
    completedDaysInLevel: 0,
    completedDaysRequiredForNextLevel: 2,
    remainingXp: 180,
    remainingCompletedDays: 2
  },
  today: {
    activeMembers: 27,
    featuredSessionTitle: "Evening Strength Circuit",
    checkInsToday: 14,
    availableSessions: 3
  },
  sessions: {
    totalCheckIns: 18,
    checkedInToday: true,
    lastCheckInTitle: "Leg Day Burn",
    lastCheckInAt: "2026-03-30T18:00:00.000Z"
  }
};

export const DEMO_ONBOARDING_AUTH_RESPONSE: AuthResponse = {
  ...DEMO_AUTH_RESPONSE,
  user: {
    ...DEMO_AUTH_RESPONSE.user,
    currentBranchId: null
  }
};

export const DEMO_SESSION_LIST: { items: MemberSession[] } = {
  items: [
    {
      id: "session_1",
      title: "Chest Builder",
      description: "Upper-body hypertrophy focus",
      coachName: "Coach Amine",
      startsAt: "2026-03-29T09:00:00.000Z",
      endsAt: "2026-03-29T10:05:00.000Z",
      capacity: 20,
      checkedIn: true,
      createdAt: "2026-03-29T09:00:00.000Z"
    },
    {
      id: "session_2",
      title: "Leg Power Hour",
      description: "Strength and mobility blend",
      coachName: "Coach Sara",
      startsAt: "2026-03-28T17:30:00.000Z",
      endsAt: "2026-03-28T18:42:00.000Z",
      capacity: 18,
      checkedIn: false,
      createdAt: "2026-03-28T17:30:00.000Z"
    }
  ]
};

export const DEMO_CREATE_SESSION_REQUEST: CreateSessionRequest = {
  branchId: DEMO_BRANCH_ID,
  muscleGroup: "BACK",
  startedAt: "2026-03-30T08:30:00.000Z"
};

export const DEMO_LEADERBOARD: LeaderboardResponse = {
  branch: {
    id: DEMO_BRANCH_ID,
    name: DEMO_BRANCH_NAME
  },
  items: [
    {
      rank: 1,
      userId: "user_karim",
      displayName: "Karim Tlili",
      xp: 980
    },
    {
      rank: 2,
      userId: "user_samia",
      displayName: "Samia Jaziri",
      xp: 870
    },
    {
      rank: 3,
      userId: "user_ali_ben_salah",
      displayName: "Ali Ben Salah",
      xp: 420
    }
  ]
};

export const DEMO_MY_LEADERBOARD: MyLeaderboardResponse = {
  rank: 3,
  xp: 420,
  branchId: DEMO_BRANCH_ID
};

export const DEMO_GAMIFICATION_SUMMARY = {
  xp: 420,
  streakDays: 6,
  rank: 3,
  nextMilestoneXp: 500
};

export const DEMO_PROFILE = {
  user: DEMO_AUTH_RESPONSE.user,
  branch: DEMO_BRANCHES.find((branch) => branch.id === DEMO_BRANCH_ID) ?? DEMO_BRANCHES[0],
  preferences: {
    notificationsEnabled: true,
    weeklyGoal: 4
  }
};

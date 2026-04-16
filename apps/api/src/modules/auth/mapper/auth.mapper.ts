import type { AuthUserRecord } from "../repository/auth.repository.js";

export const mapAuthUser = (input: AuthUserRecord) => ({
  id: input.id,
  fullName: input.fullName,
  email: input.email,
  brandId: input.brandId,
  currentBranchId: input.currentBranchId,
  role: input.role,
  level: input.level,
  totalXp: input.totalXp,
  totalSessions: input.totalSessions,
  currentStreak: input.currentStreak,
  levelXpProgress: input.levelXpProgress,
  levelDaysProgress: input.levelDaysProgress,
  age: input.age,
  avatarUrl: input.avatarUrl,
  createdAt: input.createdAt.toISOString(),
  updatedAt: input.updatedAt.toISOString()
});

import type { UserRecord } from "../repository/users.repository.js";

export const mapUser = (input: UserRecord) => ({
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

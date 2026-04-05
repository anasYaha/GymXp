import type { AuthUserRecord } from "../repository/auth.repository";

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
  age: input.age,
  avatarUrl: input.avatarUrl,
  createdAt: input.createdAt.toISOString(),
  updatedAt: input.updatedAt.toISOString()
});

import type { Prisma } from "@prisma/client";

import { prisma } from "../../../core/database/prisma";

const userSelect = {
  id: true,
  fullName: true,
  email: true,
  brandId: true,
  currentBranchId: true,
  role: true,
  level: true,
  totalXp: true,
  totalSessions: true,
  currentStreak: true,
  levelXpProgress: true,
  levelDaysProgress: true,
  age: true,
  avatarUrl: true,
  createdAt: true,
  updatedAt: true,
  currentBranch: {
    select: {
      id: true,
      name: true,
      city: true
    }
  }
} satisfies Prisma.UserSelect;

export type UserRecord = Prisma.UserGetPayload<{
  select: typeof userSelect;
}>;

export const usersRepository = {
  updateCurrentBranch(userId: string, branchId: string) {
    return prisma.user.update({
      where: {
        id: userId
      },
      data: {
        currentBranchId: branchId
      },
      select: userSelect
    });
  },

  findById(userId: string) {
    return prisma.user.findUnique({
      where: {
        id: userId
      },
      select: userSelect
    });
  }
};

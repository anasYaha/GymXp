import { prisma } from "../../../core/database/prisma.js";

export const dashboardRepository = {
  getUserWithCurrentBranch(userId: string, brandId: string) {
    return prisma.user.findFirst({
      where: {
        id: userId,
        brandId
      },
      select: {
        id: true,
        fullName: true,
        email: true,
        currentBranchId: true,
        level: true,
        totalXp: true,
        totalSessions: true,
        currentStreak: true,
        levelXpProgress: true,
        levelDaysProgress: true,
        currentBranch: {
          select: {
            id: true,
            name: true,
            city: true
          }
        }
      }
    });
  },

  countSameDayUsers(branchId: string, dayType: string, startsAt: Date) {
    return prisma.workoutSession.findMany({
      where: {
        branchId,
        muscleGroup: dayType,
        startedAt: {
          gte: startsAt
        }
      },
      distinct: ["userId"],
      select: {
        userId: true
      }
    }).then((items: Array<{ userId: string }>) => items.length);
  },

  countMemberCheckIns(userId: string, branchId: string) {
    return prisma.sessionAttendance.count({
      where: {
        userId,
        branchId
      }
    });
  },

  countBranchCheckInsSince(branchId: string, startsAt: Date) {
    return prisma.sessionAttendance.count({
      where: {
        branchId,
        checkedInAt: {
          gte: startsAt
        }
      }
    });
  },

  countAvailableSessionsSince(branchId: string, startsAt: Date) {
    return prisma.branchSessionOption.count({
      where: {
        branchId,
        startsAt: {
          gte: startsAt
        }
      }
    });
  },

  countActiveMembers(branchId: string) {
    return prisma.user.count({
      where: {
        currentBranchId: branchId
      }
    });
  },

  getFeaturedSessionTitle(branchId: string, startsAt: Date) {
    return prisma.branchSessionOption.findFirst({
      where: {
        branchId,
        startsAt: {
          gte: startsAt
        }
      },
      orderBy: {
        startsAt: "asc"
      },
      select: {
        title: true
      }
    });
  },

  getLatestMemberCheckIn(userId: string, branchId: string) {
    return prisma.sessionAttendance.findFirst({
      where: {
        userId,
        branchId
      },
      orderBy: {
        checkedInAt: "desc"
      },
      select: {
        checkedInAt: true,
        sessionOption: {
          select: {
            title: true
          }
        }
      }
    });
  }
};

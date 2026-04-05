import { prisma } from "../../../core/database/prisma";

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
    return prisma.workoutSession.count({
      where: {
        branchId,
        muscleGroup: dayType,
        startedAt: {
          gte: startsAt
        }
      }
    });
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

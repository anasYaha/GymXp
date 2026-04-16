import type { Prisma } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

import { prisma } from "../../../core/database/prisma.js";

const sessionOptionSelect = {
  id: true,
  branchId: true,
  title: true,
  description: true,
  coachName: true,
  startsAt: true,
  durationMins: true,
  muscleGroup: true,
  createdAt: true,
  updatedAt: true,
  attendances: {
    where: {
      userId: ""
    },
    select: {
      id: true
    }
  }
} satisfies Prisma.BranchSessionOptionSelect;

const sessionAttendanceSelect = {
  id: true,
  userId: true,
  branchId: true,
  sessionOptionId: true,
  checkedInAt: true,
  createdAt: true,
  sessionOption: {
    select: {
      id: true,
      branchId: true,
      title: true,
      description: true,
      coachName: true,
      startsAt: true,
      durationMins: true,
      muscleGroup: true,
      createdAt: true,
      updatedAt: true
    }
  }
} satisfies Prisma.SessionAttendanceSelect;

export type SessionOptionRecord = Prisma.BranchSessionOptionGetPayload<{
  select: typeof sessionOptionSelect;
}>;

export type SessionAttendanceRecord = Prisma.SessionAttendanceGetPayload<{
  select: typeof sessionAttendanceSelect;
}>;

export const sessionsRepository = {
  findAvailableForBranch(branchId: string, userId: string) {
    return prisma.branchSessionOption.findMany({
      where: {
        branchId,
        startsAt: {
          gte: new Date()
        }
      },
      orderBy: {
        startsAt: "asc"
      },
      select: {
        ...sessionOptionSelect,
        attendances: {
          where: {
            userId
          },
          select: {
            id: true
          }
        }
      }
    });
  },

  findOptionByIdForBranch(id: string, branchId: string) {
    return prisma.branchSessionOption.findFirst({
      where: {
        id,
        branchId
      },
      select: {
        id: true
      }
    });
  },

  findAttendanceByOptionAndUser(sessionOptionId: string, userId: string) {
    return prisma.sessionAttendance.findUnique({
      where: {
        sessionOptionId_userId: {
          sessionOptionId,
          userId
        }
      },
      select: {
        id: true
      }
    });
  },

  createAttendance(input: { sessionOptionId: string; userId: string; branchId: string }) {
    return prisma.sessionAttendance.create({
      data: {
        sessionOptionId: input.sessionOptionId,
        userId: input.userId,
        branchId: input.branchId
      },
      select: sessionAttendanceSelect
    });
  },

  findAttendancesForUser(userId: string, branchId: string) {
    return prisma.sessionAttendance.findMany({
      where: {
        userId,
        branchId
      },
      orderBy: {
        checkedInAt: "desc"
      },
      select: sessionAttendanceSelect
    });
  },

  findCompletedWorkoutToday(userId: string, startOfToday: Date) {
    return prisma.workoutSession.findUnique({
      where: {
        userId_completionDay: {
          userId,
          completionDay: startOfToday
        }
      }
    });
  },

  findLatestCompletedWorkoutBeforeDay(userId: string, completionDay: Date) {
    return prisma.workoutSession.findFirst({
      where: {
        userId,
        status: "COMPLETED",
        completionDay: {
          lt: completionDay
        }
      },
      orderBy: {
        completionDay: "desc"
      },
      select: {
        completionDay: true
      }
    });
  },

  async completeWorkoutRoutine(input: {
    userId: string;
    branchId: string;
    muscleGroup: string;
    completionDay: Date;
    streakBonusXp: number;
    nextLevel: number;
    nextTotalXp: number;
    nextTotalSessions: number;
    nextCurrentStreak: number;
    nextLevelXpProgress: number;
    nextLevelDaysProgress: number;
  }) {
    try {
      return await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
        await tx.workoutSession.create({
          data: {
            userId: input.userId,
            branchId: input.branchId,
            muscleGroup: input.muscleGroup,
            completionDay: input.completionDay,
            startedAt: new Date(),
            endedAt: new Date(),
            status: "COMPLETED"
          }
        });

        await tx.xPLog.createMany({
          data: [
            {
              userId: input.userId,
              branchId: input.branchId,
              amount: 100,
              reason: `Completed ${input.muscleGroup} Workout`
            },
            ...(input.streakBonusXp > 0
              ? [
                  {
                    userId: input.userId,
                    branchId: input.branchId,
                    amount: input.streakBonusXp,
                    reason: `${input.nextCurrentStreak}-day streak bonus`
                  }
                ]
              : [])
          ]
        });

        await tx.streakSnapshot.create({
          data: {
            userId: input.userId,
            branchId: input.branchId,
            streakDays: input.nextCurrentStreak,
            recordedAt: input.completionDay
          }
        });

        return tx.user.update({
          where: { id: input.userId },
          data: {
            totalXp: input.nextTotalXp,
            totalSessions: input.nextTotalSessions,
            level: input.nextLevel,
            currentStreak: input.nextCurrentStreak,
            levelXpProgress: input.nextLevelXpProgress,
            levelDaysProgress: input.nextLevelDaysProgress
          },
          select: {
            id: true,
            level: true,
            totalXp: true,
            totalSessions: true,
            currentStreak: true,
            levelXpProgress: true,
            levelDaysProgress: true
          }
        });
      });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === "P2002"
      ) {
        return null;
      }

      throw error;
    }
  }
};

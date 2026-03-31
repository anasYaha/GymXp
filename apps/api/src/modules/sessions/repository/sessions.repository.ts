import type { Prisma } from "@prisma/client";

import { prisma } from "../../../core/database/prisma";

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
  }
};

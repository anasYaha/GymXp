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
        currentBranch: {
          select: {
            id: true,
            name: true,
            city: true
          }
        }
      }
    });
  }
};

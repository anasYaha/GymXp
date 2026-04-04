<<<<<<< HEAD
import type { Prisma } from "@prisma/client";

import { prisma } from "../../../core/database/prisma";

const branchSelect = {
  id: true,
  brandId: true,
  name: true,
  city: true,
  address: true,
  createdAt: true,
  updatedAt: true
} satisfies Prisma.GymBranchSelect;

export type BranchRecord = Prisma.GymBranchGetPayload<{
  select: typeof branchSelect;
}>;

export const branchesRepository = {
  listByBrand(brandId: string) {
    return prisma.gymBranch.findMany({
      where: {
        brandId
      },
      orderBy: [
        {
          city: "asc"
        },
        {
          name: "asc"
        }
      ],
      select: branchSelect
    });
  },

  findByIdForBrand(branchId: string, brandId: string) {
    return prisma.gymBranch.findFirst({
      where: {
        id: branchId,
        brandId
      },
      select: branchSelect
    });
  }
};
=======
export interface BranchesRepository {
  listByBrand(brandId: string): Promise<unknown[]>;
  findById(branchId: string): Promise<unknown>;
}

>>>>>>> 19a8392d8b9fce35da33f576904dc6c15d161402

import type { Prisma } from "@prisma/client";

import { prisma } from "../../../core/database/prisma";

const authUserSelect = {
  id: true,
  fullName: true,
  email: true,
  passwordHash: true,
  brandId: true,
  currentBranchId: true,
  role: true,
  createdAt: true,
  updatedAt: true
} satisfies Prisma.UserSelect;

export type AuthUserRecord = Prisma.UserGetPayload<{
  select: typeof authUserSelect;
}>;

export const authRepository = {
  findUserByEmail(email: string) {
    return prisma.user.findUnique({
      where: {
        email: email.toLowerCase()
      },
      select: authUserSelect
    });
  },

  createUser(input: {
    fullName: string;
    email: string;
    passwordHash: string;
    brandId: string;
  }) {
    return prisma.user.create({
      data: {
        fullName: input.fullName,
        email: input.email.toLowerCase(),
        passwordHash: input.passwordHash,
        brandId: input.brandId
      },
      select: authUserSelect
    });
  },

  findUserById(userId: string) {
    return prisma.user.findUnique({
      where: {
        id: userId
      },
      select: authUserSelect
    });
  }
};

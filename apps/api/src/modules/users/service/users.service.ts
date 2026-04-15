import jwt from "jsonwebtoken";

import { env } from "../../../core/config/env";
import { HttpError } from "../../../core/errors/http-error";
import { branchesRepository } from "../../branches/repository/branches.repository";
import type { AuthTokenPayload } from "../../auth/types/auth.types";
import { mapUser } from "../mapper/users.mapper";
import { usersRepository } from "../repository/users.repository";
import { getProgressSnapshot } from "../../sessions/service/progression";

const signToken = (payload: AuthTokenPayload) =>
  jwt.sign(payload, env.jwtSecret, {
    expiresIn: "7d"
  });

export class UsersService {
  async selectActiveBranch(
    input: { userId: string; brandId: string; role: AuthTokenPayload["role"] },
    branchId: string
  ) {
    const branch = await branchesRepository.findByIdForBrand(branchId, input.brandId);

    if (!branch) {
      throw new HttpError(400, "Selected branch does not belong to this brand.", "INVALID_BRANCH");
    }

    const user = await usersRepository.updateCurrentBranch(input.userId, branch.id);

    return {
      currentBranchId: user.currentBranchId,
      branch: {
        id: branch.id,
        name: branch.name,
        city: branch.city
      },
      user: mapUser(user),
      token: signToken({
        userId: user.id,
        brandId: user.brandId,
        branchId: user.currentBranchId,
        role: input.role
      })
    };
  }

  async getProfile(userId: string) {
    const user = await usersRepository.findById(userId);

    if (!user) {
      throw new HttpError(404, "User not found.", "USER_NOT_FOUND");
    }

    return {
      user: mapUser(user),
      branch: user.currentBranch
        ? {
            id: user.currentBranch.id,
            name: user.currentBranch.name,
            city: user.currentBranch.city
          }
        : null,
      stats: {
        level: user.level,
        totalXp: user.totalXp,
        totalSessions: user.totalSessions,
        currentStreak: user.currentStreak
      },
      progress: getProgressSnapshot(user.level, user.levelXpProgress, user.levelDaysProgress)
    };
  }
}

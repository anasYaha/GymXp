<<<<<<< HEAD
import jwt from "jsonwebtoken";

import { env } from "../../../core/config/env";
import { HttpError } from "../../../core/errors/http-error";
import { branchesRepository } from "../../branches/repository/branches.repository";
import type { AuthTokenPayload } from "../../auth/types/auth.types";
import { mapUser } from "../mapper/users.mapper";
import { usersRepository } from "../repository/users.repository";

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
}
=======
export class UsersService {
  selectActiveBranch(): Promise<never> {
    return Promise.reject(new Error("TODO: implement active branch assignment"));
  }
}

>>>>>>> 19a8392d8b9fce35da33f576904dc6c15d161402

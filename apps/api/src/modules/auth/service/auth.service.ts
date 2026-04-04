import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { env } from "../../../core/config/env";
import { HttpError } from "../../../core/errors/http-error";
import type { LoginDto, RegisterDto } from "../dto/auth.dto";
import { mapAuthUser } from "../mapper/auth.mapper";
import { authRepository } from "../repository/auth.repository";
import type { AuthTokenPayload } from "../types/auth.types";

const signToken = (payload: AuthTokenPayload) =>
  jwt.sign(payload, env.jwtSecret, {
    expiresIn: "7d"
  });

export class AuthService {
  async register(input: RegisterDto) {
    const existingUser = await authRepository.findUserByEmail(input.email);

    if (existingUser) {
      throw new HttpError(409, "An account with this email already exists.", "EMAIL_IN_USE");
    }

    const user = await authRepository.createUser({
      fullName: input.fullName.trim(),
      email: input.email.trim(),
      passwordHash: await bcrypt.hash(input.password, 10),
      brandId: input.brandId ?? env.demoBrandId
    });

    return {
      token: signToken({
        userId: user.id,
        brandId: user.brandId,
        branchId: user.currentBranchId,
        role: user.role
      }),
      user: mapAuthUser(user)
    };
  }

  async login(input: LoginDto) {
    const user = await authRepository.findUserByEmail(input.email);

    if (!user) {
      throw new HttpError(401, "Invalid email or password.", "INVALID_CREDENTIALS");
    }

    const isPasswordValid = await bcrypt.compare(input.password, user.passwordHash);

    if (!isPasswordValid) {
      throw new HttpError(401, "Invalid email or password.", "INVALID_CREDENTIALS");
    }

    return {
      token: signToken({
        userId: user.id,
        brandId: user.brandId,
        branchId: user.currentBranchId,
        role: user.role
      }),
      user: mapAuthUser(user)
    };
  }

  async getMe(userId: string) {
    const user = await authRepository.findUserById(userId);

    if (!user) {
      throw new HttpError(404, "User not found.", "USER_NOT_FOUND");
    }

    return {
      user: mapAuthUser(user)
    };
  }
}

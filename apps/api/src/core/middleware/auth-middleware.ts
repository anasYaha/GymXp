import type { RequestHandler } from "express";
import jwt from "jsonwebtoken";

import { env } from "../config/env";
import { HttpError } from "../errors/http-error";
import type { AuthTokenPayload } from "../../modules/auth/types/auth.types";

const adminRoles = new Set(["BRANCH_ADMIN", "BRAND_OWNER", "PLATFORM_ADMIN"]);

const getBearerToken = (authorizationHeader?: string) => {
  if (!authorizationHeader) {
    throw new HttpError(401, "Missing authorization header.", "UNAUTHORIZED");
  }

  const [scheme, token] = authorizationHeader.split(" ");

  if (scheme !== "Bearer" || !token) {
    throw new HttpError(401, "Authorization header must use Bearer token.", "UNAUTHORIZED");
  }

  return token;
};

export const requireAuth: RequestHandler = (request, _response, next) => {
  try {
    const token = getBearerToken(request.header("authorization"));
    const payload = jwt.verify(token, env.jwtSecret) as AuthTokenPayload;

    request.context = {
      userId: payload.userId,
      brandId: payload.brandId,
      branchId: payload.branchId,
      role: payload.role
    };

    next();
  } catch (error) {
    next(error);
  }
};

export const requireAdmin: RequestHandler = (request, _response, next) => {
  if (!request.context) {
    return next(new HttpError(401, "Authentication required.", "UNAUTHORIZED"));
  }

  if (!adminRoles.has(request.context.role)) {
    return next(new HttpError(403, "Admin access required.", "FORBIDDEN"));
  }

  return next();
};
<<<<<<< HEAD
import { Router } from "express";

import { asyncHandler } from "../core/http/async-handler";
import { validate } from "../core/http/validation";
import { requireAuth } from "../core/middleware/auth-middleware";
import { authController } from "../modules/auth/controller/auth.controller";
import { loginSchema, registerSchema } from "../modules/auth/validator/auth.validator";
import { branchesController } from "../modules/branches/controller/branches.controller";
import { branchParamsSchema } from "../modules/branches/validator/branches.validator";
import { dashboardController } from "../modules/dashboard/controller/dashboard.controller";
import { sessionsController } from "../modules/sessions/controller/sessions.controller";
import { sessionParamsSchema } from "../modules/sessions/validator/sessions.validator";
import { usersController } from "../modules/users/controller/users.controller";
import { selectBranchSchema } from "../modules/users/validator/users.validator";

export const routeRegistry = [
  "auth",
  "users",
  "branches",
  "dashboard",
  "sessions"
] as const;

export const registerRoutes = () => {
  const router = Router();

  router.get("/health", (_request, response) => {
    response.json({
      status: "ok"
    });
  });

  router.post(
    "/auth/register",
    validate({
      body: registerSchema
    }),
    asyncHandler(authController.register)
  );

  router.post(
    "/auth/login",
    validate({
      body: loginSchema
    }),
    asyncHandler(authController.login)
  );

  router.get("/auth/me", requireAuth, asyncHandler(authController.me));
  router.get("/branches", requireAuth, asyncHandler(branchesController.list));
  router.get(
    "/branches/:id",
    requireAuth,
    validate({
      params: branchParamsSchema
    }),
    asyncHandler(branchesController.detail)
  );
  router.post(
    "/users/select-branch",
    requireAuth,
    validate({
      body: selectBranchSchema
    }),
    asyncHandler(usersController.selectBranch)
  );
  router.get("/dashboard/summary", requireAuth, asyncHandler(dashboardController.summary));
  router.get("/sessions/available", requireAuth, asyncHandler(sessionsController.listAvailable));
  router.get("/sessions/mine", requireAuth, asyncHandler(sessionsController.listMine));
  router.post(
    "/sessions/:id/check-in",
    requireAuth,
    validate({
      params: sessionParamsSchema
    }),
    asyncHandler(sessionsController.checkIn)
  );

  return router;
};
=======
export const routeRegistry = [
  "auth",
  "users",
  "brands",
  "branches",
  "dashboard",
  "sessions",
  "gamification",
  "leaderboard",
  "analytics",
  "admin"
] as const;

export const registerRoutes = (): string[] => {
  // TODO: mount Express routers by module.
  return [...routeRegistry];
};

>>>>>>> 19a8392d8b9fce35da33f576904dc6c15d161402

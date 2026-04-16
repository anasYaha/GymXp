import { Router } from "express";

import { asyncHandler } from "../core/http/async-handler.js";
import { validate } from "../core/http/validation.js";
import { requireAuth } from "../core/middleware/auth-middleware.js";
import { authController } from "../modules/auth/controller/auth.controller.js";
import { loginSchema, registerSchema } from "../modules/auth/validator/auth.validator.js";
import { branchesController } from "../modules/branches/controller/branches.controller.js";
import { branchParamsSchema } from "../modules/branches/validator/branches.validator.js";
import { dashboardController } from "../modules/dashboard/controller/dashboard.controller.js";
import { sessionsController } from "../modules/sessions/controller/sessions.controller.js";
import { sessionParamsSchema, workoutCompleteSchema } from "../modules/sessions/validator/sessions.validator.js";
import { usersController } from "../modules/users/controller/users.controller.js";
import { selectBranchSchema } from "../modules/users/validator/users.validator.js";

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
  router.get("/users/profile", requireAuth, asyncHandler(usersController.profile));
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
  router.post(
    "/sessions/workout/complete",
    requireAuth,
    validate({
      body: workoutCompleteSchema
    }),
    asyncHandler(sessionsController.completeWorkout)
  );

  return router;
};

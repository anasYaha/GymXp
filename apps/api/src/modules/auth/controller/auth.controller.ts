<<<<<<< HEAD
import type { RequestHandler } from "express";

import { sendOk } from "../../../core/http/response";
import { AuthService } from "../service/auth.service";

const authService = new AuthService();

export const authController: Record<"register" | "login" | "me", RequestHandler> = {
  async register(request, response) {
    const result = await authService.register(request.body);
    return sendOk(response, result, 201);
  },

  async login(request, response) {
    const result = await authService.login(request.body);
    return sendOk(response, result);
  },

  async me(request, response) {
    const result = await authService.getMe(request.context!.userId);
    return sendOk(response, result);
  }
};
=======
import { notImplemented } from "../../../core/utils/not-implemented";

export const authController = {
  register: () => notImplemented("POST /auth/register"),
  login: () => notImplemented("POST /auth/login"),
  me: () => notImplemented("GET /auth/me")
};

>>>>>>> 19a8392d8b9fce35da33f576904dc6c15d161402

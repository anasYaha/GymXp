import type { RequestHandler } from "express";

import { sendOk } from "../../../core/http/response.js";
import { AuthService } from "../service/auth.service.js";

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

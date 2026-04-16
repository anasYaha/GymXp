import type { RequestHandler } from "express";

import { sendOk } from "../../../core/http/response.js";
import { UsersService } from "../service/users.service.js";

const usersService = new UsersService();

export const usersController: Record<"selectBranch" | "profile", RequestHandler> = {
  async selectBranch(request, response) {
    const result = await usersService.selectActiveBranch(
      {
        userId: request.context!.userId,
        brandId: request.context!.brandId,
        role: request.context!.role
      },
      request.body.branchId
    );

    return sendOk(response, result);
  },

  async profile(request, response) {
    const result = await usersService.getProfile(request.context!.userId);
    return sendOk(response, result);
  }
};

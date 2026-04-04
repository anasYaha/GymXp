import type { RequestHandler } from "express";

import { sendOk } from "../../../core/http/response";
import { UsersService } from "../service/users.service";

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

  async profile(_request, response) {
    return sendOk(response, {
      message: "Not part of Phase 1."
    });
  }
};

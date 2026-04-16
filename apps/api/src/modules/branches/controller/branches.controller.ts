import type { RequestHandler } from "express";

import { sendOk } from "../../../core/http/response.js";
import { BranchesService } from "../service/branches.service.js";

const branchesService = new BranchesService();

export const branchesController: Record<"list" | "detail", RequestHandler> = {
  async list(request, response) {
    const result = await branchesService.listBranchesForBrand(request.context!.brandId);
    return sendOk(response, result);
  },

  async detail(request, response) {
    const branchId =
      typeof request.params.id === "string" ? request.params.id : request.params.id?.[0] ?? "";
    const result = await branchesService.getBranchById(request.context!.brandId, branchId);
    return sendOk(response, result);
  }
};

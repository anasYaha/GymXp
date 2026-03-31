import type { RequestHandler } from "express";

import { sendOk } from "../../../core/http/response";
import { BranchesService } from "../service/branches.service";

const branchesService = new BranchesService();

export const branchesController: Record<"list" | "detail", RequestHandler> = {
  async list(request, response) {
    const result = await branchesService.listBranchesForBrand(request.context!.brandId);
    return sendOk(response, result);
  },

  async detail(request, response) {
    const result = await branchesService.getBranchById(request.context!.brandId, request.params.id);
    return sendOk(response, result);
  }
};

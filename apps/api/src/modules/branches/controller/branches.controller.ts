<<<<<<< HEAD
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
    const branchId =
      typeof request.params.id === "string" ? request.params.id : request.params.id?.[0] ?? "";
    const result = await branchesService.getBranchById(request.context!.brandId, branchId);
    return sendOk(response, result);
  }
};
=======
import { notImplemented } from "../../../core/utils/not-implemented";

export const branchesController = {
  list: () => notImplemented("GET /branches"),
  detail: () => notImplemented("GET /branches/:id")
};

>>>>>>> 19a8392d8b9fce35da33f576904dc6c15d161402

<<<<<<< HEAD
import type { RequestHandler } from "express";

import { sendOk } from "../../../core/http/response";
import { DashboardService } from "../service/dashboard.service";

const dashboardService = new DashboardService();

export const dashboardController: Record<"summary", RequestHandler> = {
  async summary(request, response) {
    const result = await dashboardService.getSummary(request.context!.userId, request.context!.brandId);
    return sendOk(response, result);
  }
};
=======
import { notImplemented } from "../../../core/utils/not-implemented";

export const dashboardController = {
  summary: () => notImplemented("GET /dashboard/summary")
};

>>>>>>> 19a8392d8b9fce35da33f576904dc6c15d161402

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

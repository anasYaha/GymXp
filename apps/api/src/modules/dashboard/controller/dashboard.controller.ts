import type { RequestHandler } from "express";

import { sendOk } from "../../../core/http/response.js";
import { DashboardService } from "../service/dashboard.service.js";

const dashboardService = new DashboardService();

export const dashboardController: Record<"summary", RequestHandler> = {
  async summary(request, response) {
    const dayType = request.query.dayType as string | undefined;
    const result = await dashboardService.getSummary(request.context!.userId, request.context!.brandId, dayType);
    return sendOk(response, result);
  }
};

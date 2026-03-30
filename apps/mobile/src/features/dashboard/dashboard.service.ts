import type { DashboardSummaryResponse } from "@gymxp/shared-types/contracts/dashboard";

import { DEMO_DASHBOARD_SUMMARY } from "../../constants/demo";
import { apiClient } from "../../services/api/api-client";

export const getDashboardSummary = async (): Promise<DashboardSummaryResponse> => {
  try {
    return await apiClient.get<DashboardSummaryResponse>("/dashboard/summary");
  } catch {
    return DEMO_DASHBOARD_SUMMARY;
  }
};


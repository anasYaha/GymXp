import type { DashboardSummaryResponse } from "@gymxp/shared-types/contracts/dashboard";

import { apiClient } from "../../services/api/api-client";

export const getDashboardSummary = async (token: string) => {
  return apiClient.request<DashboardSummaryResponse>("/dashboard/summary", {
    method: "GET",
    token
  });
};

import type { DashboardSummaryResponse } from "@gymxp/shared-types/contracts/dashboard";

import { apiClient } from "../../services/api/api-client";

export const getDashboardSummary = async (dayType?: string): Promise<DashboardSummaryResponse> => {
  const query = dayType ? `?dayType=${encodeURIComponent(dayType)}` : "";
  return apiClient.get<DashboardSummaryResponse>(`/dashboard/summary${query}`);
};

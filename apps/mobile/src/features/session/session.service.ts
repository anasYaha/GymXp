import type {
  SessionCheckInResponse,
  SessionListResponse
} from "@gymxp/shared-types/contracts/sessions";

import { apiClient } from "../../services/api/api-client";

export const listAvailableSessions = async (token: string) => {
  return apiClient.request<SessionListResponse>("/sessions/available", {
    method: "GET",
    token
  });
};

export const checkInToSession = async (token: string, sessionId: string) => {
  return apiClient.request<SessionCheckInResponse>(`/sessions/${sessionId}/check-in`, {
    method: "POST",
    token
  });
};

import type {
  CompleteSessionRequest,
  CreateSessionRequest,
  SessionListResponse
} from "@gymxp/shared-types/contracts/sessions";

import { DEMO_CREATE_SESSION_REQUEST, DEMO_SESSION_LIST } from "../../constants/demo";
import { apiClient } from "../../services/api/api-client";

export const createSession = async (payload: CreateSessionRequest) => {
  try {
    return await apiClient.post("/sessions", payload);
  } catch {
    return {
      id: "session_demo_active",
      ...payload,
      status: "ACTIVE"
    };
  }
};

export const getMySessions = async (): Promise<SessionListResponse> => {
  try {
    return await apiClient.get<SessionListResponse>("/sessions/me");
  } catch {
    return DEMO_SESSION_LIST;
  }
};

export const completeSession = async (
  sessionId: string,
  payload: CompleteSessionRequest
) => {
  try {
    return await apiClient.patch(`/sessions/${sessionId}/complete`, payload);
  } catch {
    return {
      sessionId,
      endedAt: payload.endedAt,
      status: "COMPLETED",
      fallbackSource: DEMO_CREATE_SESSION_REQUEST.branchId
    };
  }
};


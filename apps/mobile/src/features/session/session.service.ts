import type {
  MemberSession,
  SessionCheckInResponse,
  SessionListResponse,
  CompleteWorkoutResponse
} from "@gymxp/shared-types/contracts/sessions";

import { apiClient } from "../../services/api/api-client";

export const listAvailableSessions = async (): Promise<SessionListResponse> => {
  return apiClient.get<SessionListResponse>("/sessions/available");
};

export const checkInToSession = async (sessionId: string): Promise<SessionCheckInResponse> => {
  return apiClient.post<SessionCheckInResponse>(`/sessions/${sessionId}/check-in`, {});
};

export const completeWorkoutRoutine = async (muscleGroup: string): Promise<CompleteWorkoutResponse> => {
  return apiClient.post<CompleteWorkoutResponse>("/sessions/workout/complete", { muscleGroup });
};

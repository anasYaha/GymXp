import type { WorkoutSession } from "../entities/brand";

export interface CreateSessionRequest {
  branchId: string;
  muscleGroup: string;
  startedAt: string;
}

export interface CompleteSessionRequest {
  endedAt: string;
}

export interface SessionListResponse {
  items: WorkoutSession[];
}


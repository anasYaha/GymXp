export interface CreateSessionDto {
  branchId: string;
  muscleGroup: string;
  startedAt: string;
}

export interface CompleteSessionDto {
  endedAt: string;
}


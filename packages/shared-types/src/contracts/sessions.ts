export interface BranchSessionOption {
  id: string;
  branchId: string;
  title: string;
  description?: string | null;
  coachName?: string | null;
  startsAt: string;
  durationMins: number;
  muscleGroup: string;
  checkedIn: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SessionAttendance {
  id: string;
  userId: string;
  branchId: string;
  sessionOptionId: string;
  checkedInAt: string;
  createdAt: string;
  sessionOption: Omit<BranchSessionOption, "checkedIn">;
}

export interface SessionListResponse {
  items: BranchSessionOption[];
}

export interface SessionAttendanceListResponse {
  items: SessionAttendance[];
}

export interface SessionCheckInResponse {
  attendance: SessionAttendance;
}

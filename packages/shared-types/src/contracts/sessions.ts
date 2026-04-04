export interface MemberSession {
  id: string;
  title: string;
  description?: string | null;
  coachName?: string | null;
  startsAt: string;
  endsAt: string;
  capacity: number | null;
  checkedIn: boolean;
  createdAt: string;
}

export interface SessionAttendance {
  id: string;
  userId: string;
  sessionId: string;
  checkedInAt: string;
  session: Omit<MemberSession, "checkedIn">;
}

export interface SessionListResponse {
  items: MemberSession[];
}

export interface SessionAttendanceListResponse {
  items: SessionAttendance[];
}

export interface SessionCheckInResponse {
  attendance: SessionAttendance;
  xpAwarded: number;
}

export interface CreateSessionRequest {
  branchId: string;
  muscleGroup: string;
  startedAt: string;
}

export interface CompleteSessionRequest {
  endedAt: string;
}

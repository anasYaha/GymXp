<<<<<<< HEAD
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
=======
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

>>>>>>> 19a8392d8b9fce35da33f576904dc6c15d161402

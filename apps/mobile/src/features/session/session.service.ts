import type {
  MemberSession,
  SessionCheckInResponse,
  SessionListResponse
} from "@gymxp/shared-types/contracts/sessions";

import { getCurrentAuthUserId } from "../../lib/member-data";
import { supabase } from "../../lib/supabase";

type SessionRow = {
  id: string;
  title: string;
  description: string | null;
  coach_name: string | null;
  starts_at: string;
  ends_at: string;
  capacity: number | null;
  created_at: string;
};

type CheckInRow = {
  id: string;
  user_id: string;
  session_id: string;
  checked_in_at: string;
};

type CheckInRpcResult = {
  id: string;
  user_id: string;
  session_id: string;
  checked_in_at: string;
  was_created: boolean;
  xp_awarded: number;
};

const mapSession = (row: SessionRow, checkedInSessionIds: Set<string>): MemberSession => ({
  id: row.id,
  title: row.title,
  description: row.description,
  coachName: row.coach_name,
  startsAt: row.starts_at,
  endsAt: row.ends_at,
  capacity: row.capacity,
  checkedIn: checkedInSessionIds.has(row.id),
  createdAt: row.created_at
});

const getSessionRow = async (sessionId: string) => {
  const { data, error } = await supabase
    .from("sessions")
    .select("id, title, description, coach_name, starts_at, ends_at, capacity, created_at")
    .eq("id", sessionId)
    .single<SessionRow>();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const listAvailableSessions = async (): Promise<SessionListResponse> => {
  const userId = await getCurrentAuthUserId();
  const now = new Date().toISOString();

  const { data: sessionRows, error: sessionsError } = await supabase
    .from("sessions")
    .select("id, title, description, coach_name, starts_at, ends_at, capacity, created_at")
    .gte("starts_at", now)
    .order("starts_at", { ascending: true })
    .returns<SessionRow[]>();

  if (sessionsError) {
    throw new Error(sessionsError.message);
  }

  const sessionIds = (sessionRows ?? []).map((session) => session.id);
  let checkedInSessionIds = new Set<string>();

  if (sessionIds.length > 0) {
    const { data: checkInRows, error: checkInsError } = await supabase
      .from("check_ins")
      .select("session_id")
      .eq("user_id", userId)
      .in("session_id", sessionIds);

    if (checkInsError) {
      throw new Error(checkInsError.message);
    }

    checkedInSessionIds = new Set((checkInRows ?? []).map((row) => row.session_id as string));
  }

  return {
    items: (sessionRows ?? []).map((row) => mapSession(row, checkedInSessionIds))
  };
};

export const checkInToSession = async (sessionId: string): Promise<SessionCheckInResponse> => {
  const session = await getSessionRow(sessionId);

  const { data, error } = await supabase.rpc("check_into_session", {
    target_session_id: sessionId
  });

  if (error) {
    throw new Error(error.message);
  }

  const result = Array.isArray(data) ? (data[0] as CheckInRpcResult | undefined) : (data as CheckInRpcResult | null);

  if (!result) {
    throw new Error("Check-in did not return a result.");
  }

  return {
    attendance: {
      id: result.id,
      userId: result.user_id,
      sessionId: result.session_id,
      checkedInAt: result.checked_in_at,
      session: {
        id: session.id,
        title: session.title,
        description: session.description,
        coachName: session.coach_name,
        startsAt: session.starts_at,
        endsAt: session.ends_at,
        capacity: session.capacity,
        createdAt: session.created_at
      }
    },
    xpAwarded: result.xp_awarded
  };
};

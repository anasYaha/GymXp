import type { DashboardSummaryResponse } from "@gymxp/shared-types/contracts/dashboard";
import type { User } from "@gymxp/shared-types/entities/brand";

import { SINGLE_GYM } from "../../lib/member-data";
import { supabase } from "../../lib/supabase";

type CheckInRow = {
  id: string;
  session_id: string;
  checked_in_at: string;
};

type XpEventRow = {
  amount: number;
};

type SessionTitleRow = {
  id: string;
  title: string;
};

type GymMetricsRow = {
  active_members: number;
  check_ins_today: number;
  available_sessions: number;
  featured_session_title: string | null;
};

const getUtcDayKey = (value: string) => value.slice(0, 10);

const getTodayUtcKey = () => new Date().toISOString().slice(0, 10);

const calculateStreak = (checkIns: CheckInRow[]) => {
  const uniqueDays = Array.from(new Set(checkIns.map((checkIn) => getUtcDayKey(checkIn.checked_in_at)))).sort((a, b) =>
    b.localeCompare(a)
  );

  if (uniqueDays.length === 0) {
    return 0;
  }

  const today = getTodayUtcKey();
  const streakStart = uniqueDays[0] === today ? new Date(`${today}T00:00:00.000Z`) : new Date(`${uniqueDays[0]}T00:00:00.000Z`);
  const daysFromToday = Math.floor((new Date(`${today}T00:00:00.000Z`).getTime() - streakStart.getTime()) / 86400000);

  if (daysFromToday > 1) {
    return 0;
  }

  let streak = 0;
  let cursor = new Date(`${today}T00:00:00.000Z`);

  if (uniqueDays[0] !== today) {
    cursor.setUTCDate(cursor.getUTCDate() - 1);
  }

  for (const day of uniqueDays) {
    const cursorDay = cursor.toISOString().slice(0, 10);

    if (day !== cursorDay) {
      break;
    }

    streak += 1;
    cursor.setUTCDate(cursor.getUTCDate() - 1);
  }

  return streak;
};

export const getDashboardSummary = async (user: User, dayType?: string): Promise<DashboardSummaryResponse> => {
  const [{ data: checkInRows, error: checkInsError }, { data: xpRows, error: xpError }, { data: metricsRows, error: metricsError }, dayUsersRes] =
    await Promise.all([
      supabase
        .from("check_ins")
        .select("id, session_id, checked_in_at")
        .eq("user_id", user.id)
        .order("checked_in_at", { ascending: false })
        .returns<CheckInRow[]>(),
      supabase.from("xp_events").select("amount").eq("user_id", user.id).returns<XpEventRow[]>(),
      supabase.rpc("get_gym_activity_metrics"),
      dayType
        ? supabase
            .from("WorkoutSession")
            .select("id")
            .eq("muscleGroup", dayType)
            .gte("startedAt", getTodayUtcKey() + "T00:00:00.000Z")
        : Promise.resolve({ data: [] as { id: string }[], error: null })
    ]);

  if (checkInsError) {
    throw new Error(checkInsError.message);
  }

  if (xpError) {
    throw new Error(xpError.message);
  }

  if (metricsError) {
    throw new Error(metricsError.message);
  }

  const safeCheckIns = checkInRows ?? [];
  const safeXpRows = xpRows ?? [];
  const metrics = Array.isArray(metricsRows) ? ((metricsRows[0] as GymMetricsRow | undefined) ?? null) : (metricsRows as GymMetricsRow | null);
  const lastCheckIn = safeCheckIns[0] ?? null;
  let lastSessionTitle: string | null = null;

  if (lastCheckIn?.session_id) {
    const { data: lastSession, error: lastSessionError } = await supabase
      .from("sessions")
      .select("id, title")
      .eq("id", lastCheckIn.session_id)
      .single<SessionTitleRow>();

    if (lastSessionError) {
      throw new Error(lastSessionError.message);
    }

    lastSessionTitle = lastSession.title;
  }

  const xpTotal = safeXpRows.reduce((sum, row) => sum + row.amount, 0);
  const checkedInToday = safeCheckIns.some((checkIn) => getUtcDayKey(checkIn.checked_in_at) === getTodayUtcKey());

  return {
    user: {
      id: user.id,
      fullName: user.fullName,
      email: user.email
    },
    gym: SINGLE_GYM,
    stats: {
      xp: xpTotal,
      streak: calculateStreak(safeCheckIns),
      checkIns: safeCheckIns.length
    },
    today: {
      activeMembers: Number(metrics?.active_members ?? 0),
      featuredSessionTitle: metrics?.featured_session_title ?? null,
      checkInsToday: Number(metrics?.check_ins_today ?? 0),
      availableSessions: Number(metrics?.available_sessions ?? 0),
      sameDayUsers: dayUsersRes?.data?.length ?? 0
    },
    sessions: {
      totalCheckIns: safeCheckIns.length,
      checkedInToday,
      lastCheckInTitle: lastSessionTitle,
      lastCheckInAt: lastCheckIn?.checked_in_at ?? null
    }
  };
};

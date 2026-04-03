import type { DashboardSummaryResponse } from "@gymxp/shared-types/contracts/dashboard";
import type { MemberSession } from "@gymxp/shared-types/contracts/sessions";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { ActiveBranchCard } from "../../components/branch/active-branch-card";
import { ScreenShell } from "../../components/common/screen-shell";
import { SectionHeader } from "../../components/common/section-header";
import { DashboardSummaryCard } from "../../components/dashboard/dashboard-summary-card";
import { SessionOptionCard } from "../../components/sessions/session-option-card";
import { themeTokens } from "../../theme/tokens";

interface DashboardScreenProps {
  summary: DashboardSummaryResponse;
  sessions: MemberSession[];
  sessionError?: string | null;
  checkingInSessionId?: string | null;
  onCheckIn: (sessionId: string) => Promise<void>;
  onLogout: () => Promise<void>;
}

const formatSessionTime = (value: string) => {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    hour: "numeric",
    minute: "2-digit"
  }).format(new Date(value));
};

const formatLastCheckIn = (value: string | null) => {
  if (!value) {
    return "No session checked in yet";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit"
  }).format(new Date(value));
};

export const DashboardScreen = ({
  summary,
  sessions,
  sessionError,
  checkingInSessionId,
  onCheckIn,
  onLogout
}: DashboardScreenProps) => {
  return (
    <ScreenShell
      title={`Welcome, ${summary.user.fullName}`}
      subtitle="Your dashboard now reflects live member data from Supabase."
    >
      <ActiveBranchCard name={summary.gym.name} city={summary.gym.city} />

      <View style={styles.progressCard}>
        <SectionHeader
          eyebrow="Progress"
          sideLabel="Live data"
          subtitle="Your XP, streak, and attendance update from your real check-ins."
          title="Your training snapshot"
        />
        <DashboardSummaryCard
          highlight
          subtitle="Earn more by checking into upcoming sessions."
          title="XP"
          value={summary.stats.xp}
        />
        <View style={styles.statsRow}>
          <DashboardSummaryCard
            subtitle="Current attendance habit"
            title="Streak"
            value={`${summary.stats.streak} days`}
          />
          <DashboardSummaryCard
            subtitle="Total sessions you've attended"
            title="Check-ins"
            value={summary.stats.checkIns}
          />
        </View>
      </View>

      <View style={styles.todayCard}>
        <SectionHeader
          eyebrow="Today in the gym"
          subtitle={
            summary.today.featuredSessionTitle
              ? `Featured next session: ${summary.today.featuredSessionTitle}.`
              : "Your upcoming sessions will appear here as soon as they are scheduled."
          }
          title={`${summary.today.availableSessions} sessions are open for booking`}
        />
        <View style={styles.todayMetricsRow}>
          <View style={styles.todayMetric}>
            <Text style={styles.todayMetricValue}>{summary.today.checkInsToday}</Text>
            <Text style={styles.todayMetricLabel}>Check-ins today</Text>
          </View>
          <View style={styles.todayMetric}>
            <Text style={styles.todayMetricValue}>{summary.today.activeMembers}</Text>
            <Text style={styles.todayMetricLabel}>Active members</Text>
          </View>
        </View>
      </View>

      <View style={styles.sessionMetaCard}>
        <SectionHeader
          eyebrow="Attendance"
          subtitle={
            summary.sessions.checkedInToday
              ? "You've already locked in your attendance for today."
              : "You have not checked in yet today. Pick a session below to keep your streak alive."
          }
          title="Your session activity"
        />
        <Text style={styles.activityDetail}>
          {summary.sessions.checkedInToday ? "You have checked in today." : "No check-in recorded yet today."}
        </Text>
        <Text style={styles.activityDetail}>
          Last session: {summary.sessions.lastCheckInTitle ?? "No session checked in yet"}
        </Text>
        <Text style={styles.activityFootnote}>
          Last recorded time: {formatLastCheckIn(summary.sessions.lastCheckInAt)}
        </Text>
      </View>

      <View style={styles.sessionsCard}>
        <SectionHeader
          eyebrow="Upcoming sessions"
          sideLabel={`${sessions.length} live`}
          subtitle="Browse live sessions from Supabase and check in directly from the app."
          title="Sessions at your gym"
        />
        {sessionError ? <Text style={styles.errorText}>{sessionError}</Text> : null}
        {sessions.length === 0 ? <Text style={styles.emptyText}>No upcoming sessions are available right now.</Text> : null}
        {sessions.map((session) => (
          <SessionOptionCard
            key={session.id}
            loading={checkingInSessionId === session.id}
            onCheckIn={(sessionId) => {
              void onCheckIn(sessionId);
            }}
            session={session}
            timingLabel={formatSessionTime(session.startsAt)}
          />
        ))}
      </View>

      <Pressable onPress={onLogout} style={styles.logoutButton}>
        <Text style={styles.logoutText}>Log out</Text>
      </Pressable>
    </ScreenShell>
  );
};

const styles = StyleSheet.create({
  progressCard: {
    backgroundColor: themeTokens.surfaceElevated,
    borderRadius: 26,
    borderWidth: 1,
    borderColor: themeTokens.border,
    padding: 18,
    gap: 14
  },
  statsRow: {
    flexDirection: "row",
    gap: 12
  },
  todayCard: {
    backgroundColor: themeTokens.accentSoft,
    borderRadius: 24,
    padding: 18,
    gap: 16
  },
  todayMetricsRow: {
    flexDirection: "row",
    gap: 12
  },
  todayMetric: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.6)",
    borderRadius: 18,
    padding: 14,
    gap: 4
  },
  todayMetricValue: {
    color: themeTokens.text,
    fontSize: 24,
    fontWeight: "800"
  },
  todayMetricLabel: {
    color: "#7A6A46",
    fontSize: 13,
    fontWeight: "600"
  },
  sessionMetaCard: {
    backgroundColor: "#EDF6F3",
    borderRadius: 24,
    padding: 18,
    gap: 10,
    borderWidth: 1,
    borderColor: themeTokens.border
  },
  activityDetail: {
    color: themeTokens.text,
    fontSize: 15,
    fontWeight: "600"
  },
  activityFootnote: {
    color: themeTokens.textMuted,
    fontSize: 14
  },
  sessionsCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 18,
    gap: 16,
    borderWidth: 1,
    borderColor: themeTokens.border
  },
  errorText: {
    color: "#B42318",
    fontSize: 14,
    fontWeight: "600"
  },
  emptyText: {
    color: themeTokens.textMuted,
    fontSize: 14
  },
  logoutButton: {
    alignItems: "center",
    paddingVertical: 8
  },
  logoutText: {
    color: themeTokens.brandPrimary,
    fontWeight: "700",
    fontSize: 15
  }
});

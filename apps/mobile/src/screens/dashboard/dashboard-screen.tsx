import type { DashboardSummaryResponse } from "@gymxp/shared-types/contracts/dashboard";
import type { BranchSessionOption } from "@gymxp/shared-types/contracts/sessions";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { ActiveBranchCard } from "../../components/branch/active-branch-card";
import { ScreenShell } from "../../components/common/screen-shell";
import { DashboardSummaryCard } from "../../components/dashboard/dashboard-summary-card";
import { themeTokens } from "../../theme/tokens";

interface DashboardScreenProps {
  summary: DashboardSummaryResponse;
  sessions: BranchSessionOption[];
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
      subtitle="This summary is branch-specific and reflects today inside your selected gym."
    >
      <ActiveBranchCard name={summary.branch.name} city={summary.branch.city} />
      <View style={styles.grid}>
        <DashboardSummaryCard title="XP" value={summary.stats.xp} />
        <DashboardSummaryCard title="Streak" value={`${summary.stats.streak} days`} />
        <DashboardSummaryCard title="Rank" value={`#${summary.stats.rank}`} />
        <DashboardSummaryCard title="Check-ins" value={summary.stats.checkIns} />
      </View>
      <View style={styles.todayCard}>
        <Text style={styles.todayTitle}>Today in this gym</Text>
        <Text style={styles.todayText}>{summary.today.activeMembers} active members</Text>
        <Text style={styles.todayText}>Top muscle group: {summary.today.topMuscleGroup}</Text>
        <Text style={styles.todayText}>{summary.today.checkInsToday} check-ins recorded today</Text>
        <Text style={styles.todayText}>{summary.today.availableSessions} sessions available</Text>
      </View>
      <View style={styles.sessionMetaCard}>
        <Text style={styles.todayTitle}>Your session activity</Text>
        <Text style={styles.todayText}>
          {summary.sessions.checkedInToday ? "You have checked in today." : "No check-in recorded yet today."}
        </Text>
        <Text style={styles.todayText}>
          Last check-in: {summary.sessions.lastCheckInTitle ?? "No session checked in yet"}
        </Text>
      </View>
      <View style={styles.sessionsCard}>
        <Text style={styles.sessionsTitle}>Available at your branch</Text>
        <Text style={styles.sessionsSubtitle}>
          Pick one option and mark attendance for your active branch.
        </Text>
        {sessionError ? <Text style={styles.errorText}>{sessionError}</Text> : null}
        {sessions.length === 0 ? (
          <Text style={styles.emptyText}>No upcoming sessions are available right now for this branch.</Text>
        ) : null}
        {sessions.map((session) => {
          const disabled = session.checkedIn || checkingInSessionId === session.id;

          return (
            <View key={session.id} style={styles.sessionItem}>
              <View style={styles.sessionCopy}>
                <Text style={styles.sessionName}>{session.title}</Text>
                <Text style={styles.sessionDetail}>
                  {session.muscleGroup} · {session.durationMins} mins
                </Text>
                <Text style={styles.sessionDetail}>{formatSessionTime(session.startsAt)}</Text>
                {session.coachName ? (
                  <Text style={styles.sessionDetail}>Coach: {session.coachName}</Text>
                ) : null}
                {session.description ? <Text style={styles.sessionDescription}>{session.description}</Text> : null}
              </View>
              <Pressable
                disabled={disabled}
                onPress={() => {
                  void onCheckIn(session.id);
                }}
                style={[styles.checkInButton, disabled ? styles.checkInButtonDisabled : null]}
              >
                <Text style={styles.checkInButtonText}>
                  {session.checkedIn ? "Checked in" : checkingInSessionId === session.id ? "Checking in..." : "Check in"}
                </Text>
              </Pressable>
            </View>
          );
        })}
      </View>
      <Pressable onPress={onLogout} style={styles.logoutButton}>
        <Text style={styles.logoutText}>Log out</Text>
      </Pressable>
    </ScreenShell>
  );
};

const styles = StyleSheet.create({
  grid: {
    gap: 12
  },
  todayCard: {
    backgroundColor: "#fff6df",
    borderRadius: 18,
    padding: 18,
    gap: 8
  },
  sessionMetaCard: {
    backgroundColor: "#edf6f3",
    borderRadius: 18,
    padding: 18,
    gap: 8,
    borderWidth: 1,
    borderColor: "#d8e4df"
  },
  todayTitle: {
    color: themeTokens.text,
    fontSize: 18,
    fontWeight: "700"
  },
  todayText: {
    color: "#4d655f",
    fontSize: 15
  },
  sessionsCard: {
    backgroundColor: "#ffffff",
    borderRadius: 18,
    padding: 18,
    gap: 14,
    borderWidth: 1,
    borderColor: "#d8e4df"
  },
  sessionsTitle: {
    color: themeTokens.text,
    fontSize: 18,
    fontWeight: "700"
  },
  sessionsSubtitle: {
    color: "#55736d",
    fontSize: 14,
    lineHeight: 20
  },
  sessionItem: {
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: "#edf2ef",
    paddingTop: 14
  },
  sessionCopy: {
    gap: 4
  },
  sessionName: {
    color: themeTokens.text,
    fontSize: 16,
    fontWeight: "700"
  },
  sessionDetail: {
    color: "#4d655f",
    fontSize: 14
  },
  sessionDescription: {
    color: "#55736d",
    fontSize: 14,
    lineHeight: 20
  },
  checkInButton: {
    alignItems: "center",
    backgroundColor: themeTokens.brandPrimary,
    borderRadius: 14,
    paddingVertical: 12
  },
  checkInButtonDisabled: {
    backgroundColor: "#7b9892"
  },
  checkInButtonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "700"
  },
  errorText: {
    color: "#b42318",
    fontSize: 14,
    fontWeight: "600"
  },
  emptyText: {
    color: "#55736d",
    fontSize: 14
  },
  logoutButton: {
    alignItems: "center",
    paddingVertical: 10
  },
  logoutText: {
    color: themeTokens.brandPrimary,
    fontWeight: "700"
  }
});

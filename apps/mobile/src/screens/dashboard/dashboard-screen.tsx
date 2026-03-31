import type { DashboardSummaryResponse } from "@gymxp/shared-types/contracts/dashboard";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { ActiveBranchCard } from "../../components/branch/active-branch-card";
import { ScreenShell } from "../../components/common/screen-shell";
import { DashboardSummaryCard } from "../../components/dashboard/dashboard-summary-card";
import { themeTokens } from "../../theme/tokens";

interface DashboardScreenProps {
  summary: DashboardSummaryResponse;
  onLogout: () => Promise<void>;
}

export const DashboardScreen = ({ summary, onLogout }: DashboardScreenProps) => {
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
      </View>
      <View style={styles.todayCard}>
        <Text style={styles.todayTitle}>Today in this gym</Text>
        <Text style={styles.todayText}>{summary.today.activeMembers} active members</Text>
        <Text style={styles.todayText}>Top muscle group: {summary.today.topMuscleGroup}</Text>
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
  todayTitle: {
    color: themeTokens.text,
    fontSize: 18,
    fontWeight: "700"
  },
  todayText: {
    color: "#4d655f",
    fontSize: 15
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

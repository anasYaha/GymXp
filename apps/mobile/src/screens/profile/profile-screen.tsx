import React from "react";
import { StyleSheet, Text, View, ScrollView, SafeAreaView, Pressable } from "react-native";
import { authStore } from "../../features/auth/auth.store";
import { themeTokens, spacing, radii } from "../../theme/tokens";
import { ScreenShell } from "../../components/common/screen-shell";
import { XpProgressBar } from "../../components/ui/xp-progress-bar";

export const ProfileScreen = () => {
  const user = authStore.user;

  if (!user) {
    return (
      <ScreenShell title="Profile">
        <Text style={{ color: themeTokens.textMuted }}>No user data found.</Text>
      </ScreenShell>
    );
  }

  const initials = user.fullName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const xpMax = user.level * 100;

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header / Avatar */}
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{initials}</Text>
          </View>
          <Text style={styles.name}>{user.fullName}</Text>
          <Text style={styles.email}>{user.email}</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>LEVEL {user.level} · IRON WARRIOR</Text>
          </View>
        </View>

        {/* Level Progress */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>PROGRESSION</Text>
          <View style={styles.progressCard}>
            <XpProgressBar 
              current={user.levelXpProgress}
              max={xpMax}
              label={`${user.levelXpProgress}/${xpMax} XP • ${user.levelDaysProgress}/${user.level} days`}
            />
            <Text style={styles.xpSub}>
              {xpMax - user.levelXpProgress} XP and {user.level - user.levelDaysProgress} day(s) to Next Level
            </Text>
          </View>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{user.totalSessions}</Text>
            <Text style={styles.statLabel}>Sessions</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{user.currentStreak}</Text>
            <Text style={styles.statLabel}>Streak</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{user.age ?? "--"}</Text>
            <Text style={styles.statLabel}>Age</Text>
          </View>
        </View>

        {/* Account Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ACCOUNT DETAILS</Text>
          <View style={styles.detailCard}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Member Since</Text>
              <Text style={styles.detailValue}>{new Date(user.createdAt).toLocaleDateString()}</Text>
            </View>
             <View style={styles.divider} />
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Active Branch</Text>
              <Text style={styles.detailValue}>{user.currentBranchId ? "Connected" : "Not Set"}</Text>
            </View>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: themeTokens.surface },
  container: { padding: spacing.lg, gap: 24, paddingBottom: 100 },
  header: { alignItems: "center", gap: 8, marginTop: 20 },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: themeTokens.surfaceElevated,
    borderWidth: 2,
    borderColor: themeTokens.brandPrimary,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: themeTokens.brandPrimary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  avatarText: { fontSize: 36, fontWeight: "700", color: themeTokens.text },
  name: { fontSize: 24, fontWeight: "700", color: themeTokens.text, marginTop: 8 },
  email: { fontSize: 14, color: themeTokens.textMuted },
  badge: {
    backgroundColor: "rgba(255, 107, 0, 0.1)",
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 107, 0, 0.3)",
    marginTop: 4,
  },
  badgeText: { color: themeTokens.brandPrimary, fontSize: 12, fontWeight: "700", letterSpacing: 0.5 },
  section: { gap: 12 },
  sectionTitle: { fontSize: 12, fontWeight: "700", color: themeTokens.textMuted, letterSpacing: 1 },
  progressCard: {
    backgroundColor: themeTokens.surfaceElevated,
    padding: spacing.md,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: themeTokens.border,
  },
  xpSub: { color: themeTokens.textMuted, fontSize: 12, marginTop: 8, textAlign: "right", fontStyle: "italic" },
  statsGrid: { flexDirection: "row", gap: 12 },
  statItem: {
    flex: 1,
    backgroundColor: themeTokens.surfaceElevated,
    padding: spacing.md,
    borderRadius: radii.lg,
    alignItems: "center",
    borderWidth: 1,
    borderColor: themeTokens.border,
  },
  statValue: { fontSize: 20, fontWeight: "800", color: themeTokens.text },
  statLabel: { fontSize: 12, color: themeTokens.textMuted, marginTop: 2 },
  detailCard: {
    backgroundColor: themeTokens.surfaceElevated,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: themeTokens.border,
    overflow: "hidden",
  },
  detailRow: {
    padding: spacing.md,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  detailLabel: { color: themeTokens.textMuted, fontSize: 14 },
  detailValue: { color: themeTokens.text, fontSize: 14, fontWeight: "600" },
  divider: { height: 1, backgroundColor: themeTokens.border, marginHorizontal: spacing.md },
});

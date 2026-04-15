import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { themeTokens, radii, spacing } from "../../theme/tokens";
import { XpProgressBar } from "../../components/ui/xp-progress-bar";
import { BadgeTile } from "../../components/ui/badge-tile";
import { LeaderboardRow } from "../../components/ui/leaderboard-row";

const BADGES = [
  { emoji: "🏆", name: "Champion", earned: true },
  { emoji: "🔥", name: "On Fire", earned: true },
  { emoji: "💎", name: "Diamond", earned: true },
  { emoji: "⚡", name: "Electric", earned: true },
  { emoji: "🎯", name: "Sniper", earned: false },
  { emoji: "🦁", name: "Beast", earned: false },
  { emoji: "🌟", name: "Star", earned: false },
  { emoji: "👑", name: "King", earned: false },
];

const LEADERBOARD = [
  { rank: 1, avatar: "🧔", name: "Mike Steel", level: "Level 28", xp: "4,120" },
  { rank: 2, avatar: "💪", name: "Sara Power", level: "Level 26", xp: "3,890" },
  { rank: 3, avatar: "🦁", name: "You", level: "Level 24", xp: "2,840", isMe: true },
  { rank: 4, avatar: "🏋️", name: "Jake Iron", level: "Level 22", xp: "2,450" },
  { rank: 5, avatar: "🔥", name: "Lena Blaze", level: "Level 21", xp: "2,280" },
];

export const RewardsScreen = () => {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.pageTitle}>REWARDS & LEADERBOARD</Text>

        <View style={styles.avatarSection}>
          <View style={styles.avatarCircle}><Text style={styles.avatarEmoji}>🦁</Text></View>
          <View style={styles.levelBadge}><Text style={styles.levelText}>Level 24</Text></View>
          <Text style={styles.xpBig}>2,840 XP</Text>
          <XpProgressBar current={2840} max={4000} />
        </View>

        <View style={styles.secRow}>
          <Text style={styles.secTitle}>BADGES</Text>
          <Text style={styles.seeAll}>See All</Text>
        </View>
        <View style={styles.badgeGrid}>
          {BADGES.map((b) => <BadgeTile key={b.name} {...b} />)}
        </View>

        <View style={styles.secRow}>
          <Text style={styles.secTitle}>LEADERBOARD</Text>
          <Text style={styles.seeAll}>This Week</Text>
        </View>
        <View style={styles.lbList}>
          {LEADERBOARD.map((r) => <LeaderboardRow key={r.rank} {...r} isCurrentUser={r.isMe} />)}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: themeTokens.surface },
  scroll: { padding: spacing.lg, paddingTop: 18, paddingBottom: 100, gap: 12 },
  pageTitle: { fontSize: 20, fontWeight: "900", color: themeTokens.text, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 },
  avatarSection: { alignItems: "center", marginBottom: 4 },
  avatarCircle: {
    width: 80, height: 80, borderRadius: 40,
    borderWidth: 3, borderColor: themeTokens.brandPrimary,
    backgroundColor: themeTokens.surfaceElevated,
    alignItems: "center", justifyContent: "center", marginBottom: 8,
  },
  avatarEmoji: { fontSize: 36 },
  levelBadge: {
    backgroundColor: themeTokens.brandPrimary, borderRadius: 8,
    paddingHorizontal: 10, paddingVertical: 3,
  },
  levelText: { fontSize: 11, fontWeight: "800", color: "#FFFFFF", textTransform: "uppercase" },
  xpBig: { fontSize: 36, fontWeight: "900", color: themeTokens.accent, marginVertical: 6, letterSpacing: 0.5 },
  secRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  secTitle: { fontSize: 16, fontWeight: "700", color: themeTokens.text, textTransform: "uppercase", letterSpacing: 0.6 },
  seeAll: { fontSize: 12, fontWeight: "700", color: themeTokens.brandPrimary, textTransform: "uppercase" },
  badgeGrid: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  lbList: { gap: 6 },
});

// Fix badgeGrid children width — 4 columns
const badgeTileWidth = "23%";

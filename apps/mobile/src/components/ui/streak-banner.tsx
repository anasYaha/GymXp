import { StyleSheet, Text, View } from "react-native";
import { themeTokens, radii } from "../../theme/tokens";

interface StreakBannerProps {
  days: number;
  nextRewardAt: number;
}

export const StreakBanner = ({ days, nextRewardAt }: StreakBannerProps) => {
  return (
    <View style={styles.banner}>
      <Text style={styles.emoji}>🔥</Text>
      <View style={styles.info}>
        <Text style={styles.days}>{days}-day streak!</Text>
        <Text style={styles.sub}>Keep going — next reward at {nextRewardAt} days</Text>
      </View>
      <Text style={styles.reward}>🎁 Unlock</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  banner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderWidth: 1,
    borderColor: themeTokens.accent,
    borderRadius: radii.lg,
    padding: 12,
    backgroundColor: "rgba(163,255,18,0.04)",
  },
  emoji: { fontSize: 28 },
  info: { flex: 1 },
  days: {
    fontSize: 14,
    fontWeight: "800",
    color: themeTokens.accent,
  },
  sub: {
    fontSize: 12,
    color: themeTokens.textMuted,
    fontWeight: "600",
  },
  reward: {
    fontSize: 10,
    fontWeight: "700",
    color: themeTokens.accent,
  },
});

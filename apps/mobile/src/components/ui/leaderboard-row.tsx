import { StyleSheet, Text, View } from "react-native";
import { themeTokens, radii } from "../../theme/tokens";

interface LeaderboardRowProps {
  rank: number;
  avatar: string;
  name: string;
  level: string;
  xp: string;
  isCurrentUser?: boolean;
}

export const LeaderboardRow = ({ rank, avatar, name, level, xp, isCurrentUser }: LeaderboardRowProps) => {
  return (
    <View style={[styles.row, isCurrentUser ? styles.rowMe : null]}>
      <Text style={[styles.rank, isCurrentUser ? styles.rankMe : null]}>{rank}</Text>
      <View style={styles.avatar}>
        <Text style={styles.avatarEmoji}>{avatar}</Text>
      </View>
      <View style={styles.info}>
        <Text style={[styles.name, isCurrentUser ? styles.nameMe : null]}>{name}</Text>
        <Text style={styles.level}>{level}</Text>
      </View>
      <Text style={styles.xp}>{xp}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: themeTokens.surfaceElevated,
    borderWidth: 1,
    borderColor: themeTokens.border,
  },
  rowMe: {
    borderColor: themeTokens.brandPrimary,
    backgroundColor: "rgba(255,107,0,0.08)",
  },
  rank: {
    fontSize: 18,
    fontWeight: "900",
    color: themeTokens.text,
    width: 24,
    letterSpacing: 0.5,
  },
  rankMe: { color: themeTokens.brandPrimary },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: themeTokens.surfaceMuted,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarEmoji: { fontSize: 16 },
  info: { flex: 1 },
  name: { fontSize: 13, fontWeight: "700", color: themeTokens.text },
  nameMe: { color: themeTokens.brandPrimary },
  level: { fontSize: 10, color: themeTokens.textMuted },
  xp: {
    fontSize: 16,
    fontWeight: "900",
    color: themeTokens.accent,
    letterSpacing: 0.5,
  },
});

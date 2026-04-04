import { StyleSheet, Text, View } from "react-native";
import { themeTokens, radii } from "../../theme/tokens";

interface WorkoutCardProps {
  icon: string;
  name: string;
  muscles: string;
  status: "start" | "pending";
}

export const WorkoutCard = ({ icon, name, muscles, status }: WorkoutCardProps) => {
  return (
    <View style={styles.card}>
      <View style={styles.iconBox}>
        <Text style={styles.icon}>{icon}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.muscles}>{muscles}</Text>
      </View>
      <View style={[styles.badge, status === "start" ? styles.badgeStart : styles.badgePending]}>
        <Text style={[styles.badgeText, status === "start" ? styles.badgeTextStart : null]}>
          {status === "start" ? "START" : "PENDING"}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: themeTokens.surfaceElevated,
    borderWidth: 1,
    borderColor: themeTokens.border,
    borderRadius: radii.lg,
    padding: 12,
  },
  iconBox: {
    width: 44,
    height: 44,
    backgroundColor: themeTokens.surfaceMuted,
    borderRadius: radii.md,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: { fontSize: 28 },
  info: { flex: 1 },
  name: { fontWeight: "700", fontSize: 14, color: themeTokens.text },
  muscles: { fontSize: 11, color: themeTokens.textMuted },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeStart: { backgroundColor: themeTokens.brandPrimary },
  badgePending: { backgroundColor: themeTokens.surfaceMuted },
  badgeText: {
    fontSize: 10,
    fontWeight: "800",
    textTransform: "uppercase",
    color: themeTokens.textMuted,
  },
  badgeTextStart: { color: "#FFFFFF" },
});

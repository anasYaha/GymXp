import { StyleSheet, Text, View } from "react-native";
import { themeTokens, radii } from "../../theme/tokens";

interface MeasurementCardProps {
  label: string;
  value: string;
  delta: string;
  direction: "up" | "down";
}

export const MeasurementCard = ({ label, value, delta, direction }: MeasurementCardProps) => {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
      <Text style={[styles.delta, direction === "up" ? styles.up : styles.down]}>
        {direction === "up" ? "▲" : "▼"} {delta}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: themeTokens.surfaceElevated,
    borderWidth: 1,
    borderColor: themeTokens.border,
    borderRadius: radii.lg,
    padding: 14,
  },
  label: {
    fontSize: 11,
    fontWeight: "600",
    color: themeTokens.textMuted,
  },
  value: {
    fontSize: 22,
    fontWeight: "900",
    color: themeTokens.text,
    letterSpacing: 0.5,
  },
  delta: {
    fontSize: 11,
    fontWeight: "700",
  },
  up: { color: themeTokens.accent },
  down: { color: themeTokens.brandPrimary },
});

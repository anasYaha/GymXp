import { StyleSheet, Text, View } from "react-native";
import { themeTokens, radii } from "../../theme/tokens";

interface StatCardProps {
  value: string | number;
  label: string;
  color?: string;
  borderColor?: string;
}

export const StatCard = ({ value, label, color, borderColor }: StatCardProps) => {
  return (
    <View style={[styles.card, borderColor ? { borderColor } : null]}>
      <Text style={[styles.value, color ? { color } : null]}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
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
    paddingVertical: 12,
    paddingHorizontal: 8,
    alignItems: "center",
  },
  value: {
    fontSize: 22,
    fontWeight: "900",
    color: themeTokens.text,
    letterSpacing: 0.5,
  },
  label: {
    fontSize: 10,
    fontWeight: "600",
    color: themeTokens.textMuted,
    marginTop: 2,
  },
});

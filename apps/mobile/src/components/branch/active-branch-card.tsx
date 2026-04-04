import { StyleSheet, Text, View } from "react-native";

import { themeTokens } from "../../theme/tokens";

interface ActiveBranchCardProps {
  name: string;
  city: string;
}

export const ActiveBranchCard = ({ name, city }: ActiveBranchCardProps) => {
  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <Text style={styles.label}>Active Gym</Text>
        <View style={styles.pill}>
          <Text style={styles.pillText}>{city}</Text>
        </View>
      </View>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.city}>Your workouts, XP, and attendance are being tracked here.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#1A1A1A",
    borderRadius: 24,
    padding: 20,
    gap: 8,
    borderWidth: 1,
    borderColor: "#2A2A2A",
    borderLeftWidth: 3,
    borderLeftColor: themeTokens.brandPrimary,
    shadowColor: "#FF6B00",
    shadowOpacity: 0.15,
    shadowRadius: 18,
    shadowOffset: {
      width: 0,
      height: 10
    },
    elevation: 4
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12
  },
  label: {
    color: themeTokens.textMuted,
    fontSize: 12,
    fontWeight: "600",
    textTransform: "uppercase"
  },
  pill: {
    backgroundColor: "rgba(255,107,0,0.15)",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6
  },
  pillText: {
    color: themeTokens.brandPrimary,
    fontSize: 12,
    fontWeight: "700"
  },
  name: {
    color: themeTokens.text,
    fontSize: 24,
    lineHeight: 30,
    fontWeight: "800"
  },
  city: {
    color: themeTokens.textMuted,
    fontSize: 14,
    lineHeight: 20
  }
});

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
        <Text style={styles.label}>Active Branch</Text>
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
    backgroundColor: themeTokens.brandPrimary,
    borderRadius: 24,
    padding: 20,
    gap: 8,
    shadowColor: "#000000",
    shadowOpacity: 0.14,
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
    color: "#d6ebe7",
    fontSize: 12,
    fontWeight: "600",
    textTransform: "uppercase"
  },
  pill: {
    backgroundColor: "rgba(255,255,255,0.12)",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6
  },
  pillText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700"
  },
  name: {
    color: "#ffffff",
    fontSize: 24,
    lineHeight: 30,
    fontWeight: "800"
  },
  city: {
    color: "#D8ECE7",
    fontSize: 14,
    lineHeight: 20
  }
});

import { StyleSheet, Text, View } from "react-native";

import { themeTokens } from "../../theme/tokens";

interface ActiveBranchCardProps {
  name: string;
  city: string;
}

export const ActiveBranchCard = ({ name, city }: ActiveBranchCardProps) => {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>Active Branch</Text>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.city}>{city}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: themeTokens.brandPrimary,
    borderRadius: 20,
    padding: 20,
    gap: 6
  },
  label: {
    color: "#d6ebe7",
    fontSize: 12,
    fontWeight: "600",
    textTransform: "uppercase"
  },
  name: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "700"
  },
  city: {
    color: "#f1f7f5",
    fontSize: 16
  }
});

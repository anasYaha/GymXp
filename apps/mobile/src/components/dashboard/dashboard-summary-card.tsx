import { StyleSheet, Text, View } from "react-native";

import { themeTokens } from "../../theme/tokens";

interface DashboardSummaryCardProps {
  title: string;
  value: string | number;
}

export const DashboardSummaryCard = ({ title, value }: DashboardSummaryCardProps) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 18,
    padding: 18,
    minHeight: 110,
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#d8e4df"
  },
  title: {
    color: "#55736d",
    fontSize: 14,
    fontWeight: "600"
  },
  value: {
    color: themeTokens.text,
    fontSize: 28,
    fontWeight: "700"
  }
});

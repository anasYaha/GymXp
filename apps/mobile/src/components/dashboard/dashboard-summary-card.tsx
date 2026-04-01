import { StyleSheet, Text, View } from "react-native";

import { themeTokens } from "../../theme/tokens";

interface DashboardSummaryCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  highlight?: boolean;
}

export const DashboardSummaryCard = ({
  title,
  value,
  subtitle,
  highlight = false
}: DashboardSummaryCardProps) => {
  return (
    <View style={[styles.card, highlight ? styles.highlightCard : null]}>
      <Text style={[styles.title, highlight ? styles.highlightTitle : null]}>{title}</Text>
      <Text style={[styles.value, highlight ? styles.highlightValue : null]}>{value}</Text>
      {subtitle ? (
        <Text style={[styles.subtitle, highlight ? styles.highlightSubtitle : null]}>{subtitle}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 18,
    minHeight: 110,
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: themeTokens.border,
    gap: 8
  },
  highlightCard: {
    backgroundColor: themeTokens.brandPrimary,
    borderColor: themeTokens.brandPrimaryStrong,
    shadowColor: "#000000",
    shadowOpacity: 0.12,
    shadowRadius: 14,
    shadowOffset: {
      width: 0,
      height: 8
    },
    elevation: 3
  },
  title: {
    color: "#55736d",
    fontSize: 13,
    fontWeight: "600"
  },
  highlightTitle: {
    color: "#D3ECE6"
  },
  value: {
    color: themeTokens.text,
    fontSize: 28,
    fontWeight: "800"
  },
  highlightValue: {
    color: "#FFFFFF",
    fontSize: 34
  },
  subtitle: {
    color: themeTokens.textSoft,
    fontSize: 13,
    lineHeight: 18
  },
  highlightSubtitle: {
    color: "#EEF8F5"
  }
});

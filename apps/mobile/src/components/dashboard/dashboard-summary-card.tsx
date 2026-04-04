<<<<<<< HEAD
import { StyleSheet, Text, View } from "react-native";

import { themeTokens } from "../../theme/tokens";

interface DashboardSummaryCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  highlight?: boolean;
=======
export interface DashboardSummaryCardProps {
  title: string;
  value: string | number;
  helperText?: string;
>>>>>>> 19a8392d8b9fce35da33f576904dc6c15d161402
}

export const DashboardSummaryCard = ({
  title,
  value,
<<<<<<< HEAD
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
    backgroundColor: themeTokens.surfaceElevated,
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
    shadowColor: "#FF6B00",
    shadowOpacity: 0.25,
    shadowRadius: 14,
    shadowOffset: {
      width: 0,
      height: 8
    },
    elevation: 3
  },
  title: {
    color: themeTokens.textMuted,
    fontSize: 13,
    fontWeight: "600"
  },
  highlightTitle: {
    color: "rgba(255,255,255,0.75)"
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
    color: "rgba(255,255,255,0.65)"
  }
});
=======
  helperText
}: DashboardSummaryCardProps) => ({
  title,
  value,
  helperText
});

>>>>>>> 19a8392d8b9fce35da33f576904dc6c15d161402

import { StyleSheet, Text, View } from "react-native";

import { themeTokens } from "../../theme/tokens";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  sideLabel?: string;
}

export const SectionHeader = ({ eyebrow, title, subtitle, sideLabel }: SectionHeaderProps) => {
  return (
    <View style={styles.row}>
      <View style={styles.copy}>
        {eyebrow ? <Text style={styles.eyebrow}>{eyebrow}</Text> : null}
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
      {sideLabel ? <Text style={styles.sideLabel}>{sideLabel}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: 16,
    justifyContent: "space-between",
    alignItems: "flex-start"
  },
  copy: {
    flex: 1,
    gap: 4
  },
  eyebrow: {
    color: themeTokens.brandPrimary,
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1.1,
    textTransform: "uppercase"
  },
  title: {
    color: themeTokens.text,
    fontSize: 20,
    fontWeight: "800"
  },
  subtitle: {
    color: themeTokens.textMuted,
    fontSize: 14,
    lineHeight: 20
  },
  sideLabel: {
    color: themeTokens.textSoft,
    fontSize: 13,
    fontWeight: "700",
    paddingTop: 2
  }
});

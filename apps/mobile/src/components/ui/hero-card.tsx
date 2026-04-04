import type { PropsWithChildren } from "react";
import { StyleSheet, Text, View } from "react-native";
import { themeTokens, radii, spacing } from "../../theme/tokens";

interface HeroCardProps extends PropsWithChildren {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}

export const HeroCard = ({ eyebrow, title, subtitle, children }: HeroCardProps) => {
  return (
    <View style={styles.card}>
      {eyebrow ? <Text style={styles.eyebrow}>{eyebrow}</Text> : null}
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      {children}
      <View style={styles.circle} />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "rgba(255,107,0,0.1)",
    borderWidth: 1,
    borderColor: "rgba(255,107,0,0.2)",
    borderRadius: radii.lg,
    padding: spacing.lg,
    overflow: "hidden",
  },
  eyebrow: {
    fontSize: 11,
    fontWeight: "700",
    color: themeTokens.brandPrimary,
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
    color: themeTokens.text,
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 12,
    color: themeTokens.textMuted,
  },
  circle: {
    position: "absolute",
    right: -30,
    top: -30,
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "rgba(255,107,0,0.06)",
  },
});

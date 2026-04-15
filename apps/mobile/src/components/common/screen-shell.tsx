import type { PropsWithChildren } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";

import { themeTokens } from "../../theme/tokens";

interface ScreenShellProps extends PropsWithChildren {
  title: string;
  subtitle?: string;
}

export const ScreenShell = ({ children, title, subtitle }: ScreenShellProps) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <View style={styles.kicker}>
            <Text style={styles.kickerText}>GymXP Member</Text>
          </View>
          <Text style={styles.title}>{title}</Text>
          {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        </View>
        {children}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: themeTokens.surface
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 32,
    gap: 18
  },
  header: {
    gap: 10,
    marginBottom: 4
  },
  kicker: {
    alignSelf: "flex-start",
    backgroundColor: themeTokens.brandPrimarySoft,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: themeTokens.border,
    paddingHorizontal: 12,
    paddingVertical: 6
  },
  kickerText: {
    color: themeTokens.brandPrimary,
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.9,
    textTransform: "uppercase"
  },
  title: {
    color: themeTokens.text,
    fontSize: 32,
    lineHeight: 38,
    fontWeight: "800"
  },
  subtitle: {
    color: themeTokens.textMuted,
    fontSize: 15,
    lineHeight: 22
  }
});

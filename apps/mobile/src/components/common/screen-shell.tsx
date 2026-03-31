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
    paddingVertical: 24,
    gap: 16
  },
  header: {
    gap: 8
  },
  title: {
    color: themeTokens.text,
    fontSize: 30,
    fontWeight: "700"
  },
  subtitle: {
    color: "#44615c",
    fontSize: 15,
    lineHeight: 22
  }
});

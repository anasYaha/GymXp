import { StyleSheet, Text, View } from "react-native";
import { themeTokens, radii, spacing } from "../../theme/tokens";

interface XpProgressBarProps {
  current: number;
  max: number;
  label?: string;
}

export const XpProgressBar = ({ current, max, label }: XpProgressBarProps) => {
  const pct = max > 0 ? Math.min((current / max) * 100, 100) : 0;

  return (
    <View style={styles.wrap}>
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${pct}%` }]} />
      </View>
      {label ? <Text style={styles.label}>{label}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: { gap: 3 },
  track: {
    height: 6,
    backgroundColor: themeTokens.border,
    borderRadius: 3,
    overflow: "hidden",
  },
  fill: {
    height: "100%",
    backgroundColor: themeTokens.accent,
    borderRadius: 3,
  },
  label: {
    fontSize: 10,
    fontWeight: "700",
    color: themeTokens.accent,
  },
});

import { StyleSheet, Text, View } from "react-native";
import { themeTokens, radii } from "../../theme/tokens";

interface ChartCardProps {
  title: string;
  value: string;
  delta: string;
  bars: number[];
  peakIndex: number;
  labels: string[];
}

export const ChartCard = ({ title, value, delta, bars, peakIndex, labels }: ChartCardProps) => {
  const maxBar = Math.max(...bars, 1);

  return (
    <View style={styles.card}>
      <View style={styles.top}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.topRight}>
          <Text style={styles.value}>{value}</Text>
          <Text style={styles.delta}>{delta}</Text>
        </View>
      </View>
      <View style={styles.bars}>
        {bars.map((h, i) => (
          <View
            key={i}
            style={[
              styles.bar,
              { height: `${(h / maxBar) * 100}%` },
              i === peakIndex ? styles.barPeak : null,
            ]}
          />
        ))}
      </View>
      <View style={styles.labels}>
        {labels.map((l) => (
          <Text key={l} style={styles.label}>{l}</Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: themeTokens.surfaceElevated,
    borderWidth: 1,
    borderColor: themeTokens.border,
    borderRadius: radii.lg,
    padding: 14,
  },
  top: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  title: {
    fontSize: 12,
    fontWeight: "600",
    color: themeTokens.textMuted,
  },
  topRight: { alignItems: "flex-end" },
  value: {
    fontSize: 28,
    fontWeight: "900",
    color: themeTokens.brandPrimary,
    letterSpacing: 0.5,
  },
  delta: {
    fontSize: 12,
    fontWeight: "700",
    color: themeTokens.accent,
  },
  bars: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 4,
    height: 80,
  },
  bar: {
    flex: 1,
    backgroundColor: themeTokens.surfaceMuted,
    borderRadius: 4,
    minWidth: 0,
  },
  barPeak: {
    backgroundColor: themeTokens.brandPrimary,
  },
  labels: {
    flexDirection: "row",
    gap: 4,
    marginTop: 4,
  },
  label: {
    flex: 1,
    textAlign: "center",
    fontSize: 9,
    color: themeTokens.textMuted,
  },
});

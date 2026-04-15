import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { themeTokens, spacing } from "../../theme/tokens";
import { ChartCard } from "../../components/ui/chart-card";
import { MeasurementCard } from "../../components/ui/measurement-card";

export const ProgressScreen = () => {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.pageTitle}>PROGRESS</Text>
        <ChartCard
          title="Body Weight"
          value="78.4 kg"
          delta="▲ 1.2 kg"
          bars={[50, 60, 55, 70, 85, 80]}
          peakIndex={4}
          labels={["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]}
        />
        <ChartCard
          title="Bench Press 1RM"
          value="105 kg"
          delta="▲ 7.5 kg"
          bars={[40, 50, 60, 65, 75, 90]}
          peakIndex={5}
          labels={["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]}
        />
        <Text style={styles.secTitle}>MEASUREMENTS</Text>
        <View style={styles.measGrid}>
          <MeasurementCard label="Chest" value="104 cm" delta="1.5" direction="up" />
          <MeasurementCard label="Waist" value="82 cm" delta="2.0" direction="down" />
        </View>
        <View style={styles.measGrid}>
          <MeasurementCard label="Arms" value="38 cm" delta="0.8" direction="up" />
          <MeasurementCard label="Thighs" value="61 cm" delta="1.2" direction="up" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: themeTokens.surface },
  scroll: { padding: spacing.lg, paddingTop: 18, paddingBottom: 100, gap: 12 },
  pageTitle: { fontSize: 20, fontWeight: "900", color: themeTokens.text, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 },
  secTitle: { fontSize: 16, fontWeight: "700", color: themeTokens.text, textTransform: "uppercase", letterSpacing: 0.6, marginTop: 4 },
  measGrid: { flexDirection: "row", gap: 8 },
});

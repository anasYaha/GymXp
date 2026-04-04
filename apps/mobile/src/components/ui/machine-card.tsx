import { StyleSheet, Text, View } from "react-native";
import { themeTokens, radii } from "../../theme/tokens";

interface MachineCardProps {
  icon: string;
  name: string;
  muscles: string;
  exerciseCount: number;
  exercises: string[];
}

export const MachineCard = ({ icon, name, muscles, exerciseCount, exercises }: MachineCardProps) => {
  return (
    <View style={styles.card}>
      <View style={styles.iconBox}>
        <Text style={styles.icon}>{icon}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.muscles}>{muscles}</Text>
        <Text style={styles.count}>{exerciseCount} exercises</Text>
        <View style={styles.chipRow}>
          {exercises.map((ex) => (
            <View key={ex} style={styles.chip}>
              <Text style={styles.chipText}>{ex}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    gap: 12,
    backgroundColor: themeTokens.surfaceElevated,
    borderWidth: 1,
    borderColor: themeTokens.border,
    borderRadius: radii.lg,
    padding: 12,
  },
  iconBox: {
    width: 56,
    height: 56,
    backgroundColor: themeTokens.surfaceMuted,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: { fontSize: 28 },
  info: { flex: 1 },
  name: { fontWeight: "700", fontSize: 14, color: themeTokens.text },
  muscles: { fontSize: 11, color: themeTokens.brandPrimary, fontWeight: "600", marginTop: 2 },
  count: { fontSize: 10, color: themeTokens.textMuted, marginTop: 2 },
  chipRow: { flexDirection: "row", flexWrap: "wrap", gap: 4, marginTop: 6 },
  chip: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    backgroundColor: themeTokens.surfaceMuted,
  },
  chipText: { fontSize: 10, fontWeight: "600", color: themeTokens.textMuted },
});

import { StyleSheet, Text, View } from "react-native";
import { themeTokens } from "../../theme/tokens";

interface ExerciseRowProps {
  name: string;
  done: boolean;
  sets: number;
  setsLogged: number;
}

export const ExerciseRow = ({ name, done, sets, setsLogged }: ExerciseRowProps) => {
  return (
    <View style={styles.row}>
      <View style={[styles.circle, done ? styles.circleDone : null]}>
        {done ? <Text style={styles.check}>✓</Text> : null}
      </View>
      <Text style={styles.name}>{name}</Text>
      <View style={styles.pills}>
        {Array.from({ length: sets }).map((_, i) => (
          <View key={i} style={[styles.pill, i < setsLogged ? styles.pillLogged : null]}>
            <Text style={[styles.pillText, i < setsLogged ? styles.pillTextLogged : null]}>{i + 1}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: themeTokens.border,
  },
  circle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: themeTokens.border,
    alignItems: "center",
    justifyContent: "center",
  },
  circleDone: {
    borderColor: themeTokens.accent,
  },
  check: {
    fontSize: 14,
    color: themeTokens.accent,
  },
  name: {
    flex: 1,
    fontSize: 13,
    fontWeight: "600",
    color: themeTokens.text,
  },
  pills: {
    flexDirection: "row",
    gap: 4,
  },
  pill: {
    width: 22,
    height: 22,
    borderRadius: 6,
    backgroundColor: themeTokens.surfaceMuted,
    borderWidth: 1,
    borderColor: themeTokens.border,
    alignItems: "center",
    justifyContent: "center",
  },
  pillLogged: {
    backgroundColor: themeTokens.brandPrimary,
    borderColor: themeTokens.brandPrimary,
  },
  pillText: {
    fontSize: 10,
    fontWeight: "700",
    color: themeTokens.textMuted,
  },
  pillTextLogged: {
    color: "#FFFFFF",
  },
});

import { useState } from "react";
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { themeTokens, radii, spacing } from "../../theme/tokens";

const harrisBenedict = (w: number, h: number, a: number, gender: "male" | "female") => {
  if (gender === "male") return 88.362 + 13.397 * w + 4.799 * h - 5.677 * a;
  return 447.593 + 9.247 * w + 3.098 * h - 4.33 * a;
};

export const NutritionScreen = () => {
  const [weight, setWeight] = useState("80");
  const [height, setHeight] = useState("178");
  const [age, setAge] = useState("27");
  const [gender, setGender] = useState<"male" | "female">("male");
  const [goal, setGoal] = useState<"cut" | "maintain" | "bulk">("maintain");
  const [results, setResults] = useState<null | {
    calories: number; protein: number; carbs: number; fat: number; fiber: number; water: number;
  }>(null);

  const calculate = () => {
    const w = parseFloat(weight) || 80;
    const h = parseFloat(height) || 178;
    const a = parseFloat(age) || 27;
    const bmr = harrisBenedict(w, h, a, gender);
    let tdee = bmr * 1.55;
    if (goal === "cut") tdee -= 400;
    else if (goal === "bulk") tdee += 300;
    const protein = Math.round(w * 2.2);
    const fat = Math.round((tdee * 0.25) / 9);
    const carbs = Math.round(Math.max(0, (tdee - protein * 4 - fat * 9) / 4));
    const fiber = Math.round(w * 0.4);
    const water = +(w * 0.035).toFixed(1);
    setResults({ calories: Math.round(tdee), protein, carbs, fat, fiber, water });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.pageTitle}>NUTRITION CALCULATOR</Text>
        <View style={styles.card}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Weight (kg)</Text>
            <TextInput style={styles.input} value={weight} onChangeText={setWeight} keyboardType="numeric" placeholderTextColor={themeTokens.textSoft} />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Height (cm)</Text>
            <TextInput style={styles.input} value={height} onChangeText={setHeight} keyboardType="numeric" placeholderTextColor={themeTokens.textSoft} />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Age</Text>
            <TextInput style={styles.input} value={age} onChangeText={setAge} keyboardType="numeric" placeholderTextColor={themeTokens.textSoft} />
          </View>
          <Text style={styles.label}>Gender</Text>
          <View style={styles.toggleRow}>
            {(["male", "female"] as const).map((g) => (
              <Pressable key={g} onPress={() => setGender(g)} style={[styles.toggleBtn, gender === g ? styles.toggleActive : null]}>
                <Text style={[styles.toggleText, gender === g ? styles.toggleTextActive : null]}>{g === "male" ? "Male" : "Female"}</Text>
              </Pressable>
            ))}
          </View>
          <Text style={styles.label}>Goal</Text>
          <View style={styles.toggleRow}>
            {([["cut", "✂ Cut"], ["maintain", "= Maintain"], ["bulk", "💪 Bulk"]] as const).map(([g, l]) => (
              <Pressable key={g} onPress={() => setGoal(g as "cut" | "maintain" | "bulk")} style={[styles.toggleBtn, goal === g ? styles.toggleActive : null]}>
                <Text style={[styles.toggleText, goal === g ? styles.toggleTextActive : null]}>{l}</Text>
              </Pressable>
            ))}
          </View>
          <Pressable style={styles.calcBtn} onPress={calculate}>
            <Text style={styles.calcBtnText}>CALCULATE</Text>
          </Pressable>
        </View>

        {results ? (
          <View style={styles.card}>
            <Text style={styles.secTitle}>Your Daily Targets</Text>
            <ResultRow label="Calories" value={`${results.calories} kcal`} pct={100} barColor={themeTokens.brandPrimary} highlight />
            <ResultRow label="Protein" value={`${results.protein}g`} pct={(results.protein * 4 / results.calories) * 100} barColor={themeTokens.accent} />
            <ResultRow label="Carbohydrates" value={`${results.carbs}g`} pct={(results.carbs * 4 / results.calories) * 100} barColor="#FF9E40" />
            <ResultRow label="Fats" value={`${results.fat}g`} pct={(results.fat * 9 / results.calories) * 100} barColor="#555" />
            <ResultRow label="Fiber" value={`${results.fiber}g`} />
            <ResultRow label="Water" value={`${results.water}L`} />
          </View>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
};

const ResultRow = ({ label, value, pct, barColor, highlight }: { label: string; value: string; pct?: number; barColor?: string; highlight?: boolean }) => (
  <View style={rStyles.row}>
    <Text style={rStyles.label}>{label}</Text>
    {pct !== undefined && barColor ? (
      <View style={rStyles.barTrack}><View style={[rStyles.barFill, { width: `${Math.min(pct, 100)}%`, backgroundColor: barColor }]} /></View>
    ) : null}
    <Text style={[rStyles.value, highlight ? { color: themeTokens.brandPrimary } : null]}>{value}</Text>
  </View>
);

const rStyles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", gap: 8, paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: themeTokens.border },
  label: { flex: 1, fontSize: 13, fontWeight: "600", color: themeTokens.textMuted },
  barTrack: { flex: 2, height: 6, backgroundColor: themeTokens.border, borderRadius: 3, overflow: "hidden" },
  barFill: { height: "100%", borderRadius: 3 },
  value: { fontSize: 18, fontWeight: "900", color: themeTokens.text, minWidth: 60, textAlign: "right", letterSpacing: 0.5 },
});

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: themeTokens.surface },
  scroll: { padding: spacing.lg, paddingTop: 18, paddingBottom: 100, gap: 12 },
  pageTitle: { fontSize: 20, fontWeight: "900", color: themeTokens.text, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 },
  card: { backgroundColor: themeTokens.surfaceElevated, borderRadius: radii.lg, borderWidth: 1, borderColor: themeTokens.border, padding: 14, gap: 10 },
  inputGroup: { gap: 4 },
  label: { fontSize: 11, fontWeight: "700", color: themeTokens.textMuted, textTransform: "uppercase", marginBottom: 4 },
  input: { backgroundColor: themeTokens.surfaceMuted, borderRadius: radii.md, borderWidth: 1, borderColor: themeTokens.border, color: themeTokens.text, paddingHorizontal: 12, paddingVertical: 10, fontSize: 14 },
  toggleRow: { flexDirection: "row", gap: 6, marginBottom: 8 },
  toggleBtn: { flex: 1, paddingVertical: 10, borderRadius: radii.md, backgroundColor: themeTokens.surfaceMuted, borderWidth: 1, borderColor: themeTokens.border, alignItems: "center" },
  toggleActive: { backgroundColor: themeTokens.brandPrimary, borderColor: themeTokens.brandPrimary },
  toggleText: { fontSize: 12, fontWeight: "700", color: themeTokens.textMuted },
  toggleTextActive: { color: "#FFFFFF" },
  calcBtn: { backgroundColor: themeTokens.brandPrimary, borderRadius: 12, alignItems: "center", paddingVertical: 14, marginTop: 4 },
  calcBtnText: { color: "#FFFFFF", fontSize: 15, fontWeight: "800", textTransform: "uppercase", letterSpacing: 1 },
  secTitle: { fontSize: 16, fontWeight: "700", color: themeTokens.text, textTransform: "uppercase", letterSpacing: 0.6 },
});

<<<<<<< HEAD
import React, { useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View, Pressable, Alert } from "react-native";
import { themeTokens, radii, spacing } from "../../theme/tokens";
import { useTrainingContext, DayName } from "../../store/training-store";

export const SessionCreateScreen = () => {
  const { state } = useTrainingContext();
  const days: DayName[] = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const currentDayName = days[new Date().getDay()];
  const todayWorkout = state.days.find((d) => d.day === currentDayName);

  const [completedSets, setCompletedSets] = useState<Record<string, number>>({});

  const hasWorkout = todayWorkout && todayWorkout.type !== "Rest" && todayWorkout.exercises.length > 0;

  const toggleSet = (exId: string, setIndex: number) => {
    setCompletedSets(prev => {
      const current = prev[exId] || 0;
      // Simple logic: tap the next available set to complete it, tap the last completed to undo
      const next = current === setIndex + 1 ? setIndex : Math.max(current, setIndex + 1);
      return { ...prev, [exId]: next };
    });
  };

  const handleFinish = () => {
    Alert.alert("Session Saved!", "Great job crushing your workout.", [{ text: "Awesome!" }]);
    setCompletedSets({});
  };

  if (!hasWorkout || !todayWorkout) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.emptyWrap}>
          <Text style={styles.emptyTitle}>No Session Scheduled</Text>
          <Text style={styles.emptySub}>Set up your workout in the Train tab first.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.pageTitle}>ACTIVE SESSION</Text>
        <Text style={styles.pageSub}>{todayWorkout.type} Day</Text>

        {todayWorkout.exercises.map((ex) => {
          const completedCount = completedSets[ex.id] || 0;
          return (
            <View key={ex.id} style={styles.card}>
              <Text style={styles.exName}>{ex.name}</Text>
              <Text style={styles.exSub}>{completedCount} / {ex.sets} Sets Completed</Text>
              
              <View style={styles.setsRow}>
                {Array.from({ length: ex.sets }).map((_, i) => {
                  const isDone = i < completedCount;
                  return (
                    <Pressable
                      key={i}
                      style={[styles.setCircle, isDone && styles.setCircleDone]}
                      onPress={() => toggleSet(ex.id, i)}
                    >
                      <Text style={[styles.setText, isDone && styles.setTextDone]}>
                        {isDone ? "✓" : i + 1}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>
          );
        })}

        <Pressable style={styles.finishBtn} onPress={handleFinish}>
          <Text style={styles.finishBtnText}>FINISH SESSION</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: themeTokens.surface },
  scroll: { padding: spacing.lg, paddingTop: 18, paddingBottom: 100, gap: 12 },
  emptyWrap: { flex: 1, alignItems: "center", justifyContent: "center", padding: 20 },
  emptyTitle: { color: themeTokens.text, fontSize: 20, fontWeight: "800", marginBottom: 8 },
  emptySub: { color: themeTokens.textMuted, fontSize: 15, textAlign: "center" },
  pageTitle: { fontSize: 22, fontWeight: "900", color: themeTokens.text, textTransform: "uppercase", letterSpacing: 1 },
  pageSub: { fontSize: 16, fontWeight: "700", color: themeTokens.brandPrimary, marginBottom: 8 },
  card: { backgroundColor: themeTokens.surfaceElevated, borderWidth: 1, borderColor: themeTokens.border, borderRadius: radii.lg, padding: 16 },
  exName: { color: themeTokens.text, fontSize: 16, fontWeight: "800" },
  exSub: { color: themeTokens.textMuted, fontSize: 12, fontWeight: "700", marginBottom: 12, marginTop: 2 },
  setsRow: { flexDirection: "row", gap: 10, flexWrap: "wrap" },
  setCircle: { width: 44, height: 44, borderRadius: 22, backgroundColor: themeTokens.surfaceMuted, borderWidth: 2, borderColor: themeTokens.border, alignItems: "center", justifyContent: "center" },
  setCircleDone: { backgroundColor: themeTokens.brandPrimary, borderColor: themeTokens.brandPrimary },
  setText: { color: themeTokens.textMuted, fontSize: 16, fontWeight: "800" },
  setTextDone: { color: "#FFFFFF" },
  finishBtn: { backgroundColor: themeTokens.brandPrimary, borderRadius: 12, alignItems: "center", paddingVertical: 16, marginTop: 12 },
  finishBtnText: { color: "#FFFFFF", fontSize: 16, fontWeight: "900", textTransform: "uppercase", letterSpacing: 1 },
});
=======
import { ScreenShell } from "../../components/common/screen-shell";
import { DEMO_CREATE_SESSION_REQUEST } from "../../constants/demo";
import { createSession } from "../../features/session/session.service";
import { getDefaultMemberBranch } from "../../features/branch/branch.service";

export const SessionCreateScreen = async () => {
  const branch = await getDefaultMemberBranch();

  return ScreenShell({
    title: "Start workout session",
    subtitle: "New sessions should always be created inside the member's active branch.",
    content: {
      branch: {
        id: branch.id,
        name: branch.name
      },
      fields: [
        {
          id: "muscleGroup",
          label: "Muscle group",
          defaultValue: DEMO_CREATE_SESSION_REQUEST.muscleGroup
        },
        {
          id: "startedAt",
          label: "Started at",
          defaultValue: DEMO_CREATE_SESSION_REQUEST.startedAt
        }
      ],
      actions: {
        submit: (payload: { muscleGroup: string; startedAt: string }) =>
          createSession({
            branchId: branch.id,
            muscleGroup: payload.muscleGroup,
            startedAt: payload.startedAt
          })
      }
    }
  });
};

>>>>>>> 19a8392d8b9fce35da33f576904dc6c15d161402

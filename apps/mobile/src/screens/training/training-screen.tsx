import React, { useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View, Pressable, TextInput, Modal, FlatList } from "react-native";
import { themeTokens, radii, spacing } from "../../theme/tokens";
import { DayTabBar } from "../../components/ui/day-tab-bar";
import { useTrainingContext, DayName } from "../../store/training-store";
import { AVAILABLE_MACHINES } from "../../store/machine-data";
import { ExerciseRow } from "../../components/ui/exercise-row";

const TRAINING_STYLES = ["Push Pull Legs", "Upper Lower", "Bro Split", "Custom"];
const DAY_TYPES = ["Push", "Pull", "Legs", "Upper", "Lower", "Chest", "Back", "Arms", "Shoulders", "Cardio", "Rest"];
const DAYS_ORDER: DayName[] = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

export const TrainingScreen = () => {
  const { state, dispatch } = useTrainingContext();
  const [activeDayIdx, setActiveDayIdx] = useState(1); // default MON
  const [isStyleModalVisible, setStyleModalVisible] = useState(false);
  const [isDayTypeModalVisible, setDayTypeModalVisible] = useState(false);
  const [isExerciseModalVisible, setExerciseModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const activeDayName = DAYS_ORDER[activeDayIdx];
  const activeDayPlan = state.days.find((d) => d.day === activeDayName)!;

  const filteredMachines = AVAILABLE_MACHINES.filter(m => 
    m.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSetStyle = (style: string) => {
    dispatch({ type: "UPDATE_PLAN_NAME", payload: style });
    setStyleModalVisible(false);
  };

  const handleSetDayType = (type: string) => {
    dispatch({
      type: "UPDATE_DAY",
      payload: { day: activeDayName, type, exercises: activeDayPlan.exercises },
    });
    setDayTypeModalVisible(false);
  };

  const handleAddExercise = (machine: typeof AVAILABLE_MACHINES[0]) => {
    const newEx = {
      id: Math.random().toString(),
      machineId: machine.id,
      name: machine.name,
      sets: 3,
    };
    dispatch({
      type: "UPDATE_DAY",
      payload: { day: activeDayName, type: activeDayPlan.type, exercises: [...activeDayPlan.exercises, newEx] },
    });
    setExerciseModalVisible(false);
    setSearchQuery("");
  };

  const handleRemoveExercise = (exId: string) => {
    dispatch({
      type: "UPDATE_DAY",
      payload: { day: activeDayName, type: activeDayPlan.type, exercises: activeDayPlan.exercises.filter((e) => e.id !== exId) },
    });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.pageTitle}>TRAINING PLAN</Text>
        
        {/* Style Selector */}
        <Pressable style={styles.card} onPress={() => setStyleModalVisible(true)}>
          <Text style={styles.planName}>{state.planName}</Text>
          <View style={styles.metaRow}>
            <View style={styles.metaTag}><Text style={styles.metaText}>Tap to change style</Text></View>
            <View style={[styles.metaTag, styles.metaTagOrange]}><Text style={styles.metaTextOrange}>Interactive</Text></View>
          </View>
        </Pressable>

        <DayTabBar days={DAYS_ORDER} activeIndex={activeDayIdx} onSelect={setActiveDayIdx} />
        
        {/* Day Editor */}
        <View style={styles.card}>
          <View style={styles.dayHeader}>
            <Text style={styles.dayTitle}>{activeDayName} - {activeDayPlan.type}</Text>
            <Pressable onPress={() => setDayTypeModalVisible(true)}>
              <Text style={styles.editBtn}>EDIT</Text>
            </Pressable>
          </View>

          {activeDayPlan.type === "Rest" ? (
             <View style={styles.emptyState}>
               <Text style={styles.emptyText}>Rest Day</Text>
               <Text style={styles.emptySubText}>Take it easy today.</Text>
             </View>
          ) : (
             <View style={{ gap: 8, marginTop: 12 }}>
                {activeDayPlan.exercises.map((ex) => (
                  <View key={ex.id} style={styles.exerciseWrapper}>
                    <Text style={styles.exName}>{ex.name}</Text>
                    <View style={styles.exRight}>
                       <Text style={styles.exSets}>{ex.sets} sets</Text>
                       <Pressable onPress={() => handleRemoveExercise(ex.id)}>
                         <Text style={styles.removeBtn}>✕</Text>
                       </Pressable>
                    </View>
                  </View>
                ))}

                <Pressable style={styles.addExerciseBtn} onPress={() => setExerciseModalVisible(true)}>
                  <Text style={styles.addExerciseBtnText}>+ ADD EXERCISE</Text>
                </Pressable>
             </View>
          )}
        </View>
      </ScrollView>

      {/* Style Modal */}
      <Modal visible={isStyleModalVisible} transparent animationType="slide">
        <View style={styles.modalBg}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Select Training Style</Text>
            {TRAINING_STYLES.map((ts) => (
              <Pressable key={ts} style={styles.modalOption} onPress={() => handleSetStyle(ts)}>
                <Text style={styles.modalOptionText}>{ts}</Text>
              </Pressable>
            ))}
            <Pressable style={styles.modalCancel} onPress={() => setStyleModalVisible(false)}><Text style={styles.modalCancelText}>Cancel</Text></Pressable>
          </View>
        </View>
      </Modal>

      {/* Day Type Modal */}
      <Modal visible={isDayTypeModalVisible} transparent animationType="slide">
        <View style={styles.modalBg}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Set Day Type ({activeDayName})</Text>
            <ScrollView style={{ maxHeight: 300 }}>
              {DAY_TYPES.map((dt) => (
                <Pressable key={dt} style={styles.modalOption} onPress={() => handleSetDayType(dt)}>
                  <Text style={styles.modalOptionText}>{dt}</Text>
                </Pressable>
              ))}
            </ScrollView>
            <Pressable style={styles.modalCancel} onPress={() => setDayTypeModalVisible(false)}><Text style={styles.modalCancelText}>Cancel</Text></Pressable>
          </View>
        </View>
      </Modal>

      {/* Exercise Modal */}
      <Modal visible={isExerciseModalVisible} transparent animationType="slide">
        <View style={styles.modalBg}>
          <View style={[styles.modalBox, { height: "70%" }]}>
            <Text style={styles.modalTitle}>Add Exercise</Text>
            <TextInput 
              style={styles.searchInput} 
              placeholder="Search..." 
              placeholderTextColor={themeTokens.textSoft}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <FlatList
              data={filteredMachines}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <Pressable style={styles.modalOption} onPress={() => handleAddExercise(item)}>
                  <Text style={styles.modalOptionText}>{item.icon} {item.name}</Text>
                </Pressable>
              )}
            />
            <Pressable style={styles.modalCancel} onPress={() => setExerciseModalVisible(false)}><Text style={styles.modalCancelText}>Cancel</Text></Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: themeTokens.surface },
  scroll: { padding: spacing.lg, paddingTop: 18, paddingBottom: 100, gap: 12 },
  pageTitle: { fontSize: 20, fontWeight: "900", color: themeTokens.text, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 },
  card: { backgroundColor: themeTokens.surfaceElevated, borderWidth: 1, borderColor: themeTokens.border, borderRadius: radii.lg, padding: 14 },
  planName: { fontSize: 16, fontWeight: "900", color: themeTokens.text, textTransform: "uppercase", letterSpacing: 0.8 },
  metaRow: { flexDirection: "row", gap: 6, marginTop: 6, flexWrap: "wrap" },
  metaTag: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8, backgroundColor: themeTokens.surfaceMuted },
  metaTagOrange: { backgroundColor: "rgba(255,107,0,0.15)" },
  metaText: { fontSize: 10, fontWeight: "700", color: themeTokens.textMuted },
  metaTextOrange: { fontSize: 10, fontWeight: "700", color: themeTokens.brandPrimary },
  dayHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  dayTitle: { color: themeTokens.text, fontSize: 16, fontWeight: "700" },
  editBtn: { color: themeTokens.brandPrimary, fontWeight: "800", fontSize: 13 },
  emptyState: { padding: 30, alignItems: "center" },
  emptyText: { color: themeTokens.text, fontSize: 16, fontWeight: "700" },
  emptySubText: { color: themeTokens.textMuted, fontSize: 13, marginTop: 4 },
  exerciseWrapper: { flexDirection: "row", justifyContent: "space-between", backgroundColor: themeTokens.surfaceMuted, padding: 12, borderRadius: 8, alignItems: "center" },
  exName: { color: themeTokens.text, fontWeight: "600", fontSize: 14 },
  exRight: { flexDirection: "row", alignItems: "center", gap: 12 },
  exSets: { color: themeTokens.textMuted, fontWeight: "700", fontSize: 12 },
  removeBtn: { color: themeTokens.danger, fontSize: 16, fontWeight: "bold" },
  addExerciseBtn: { backgroundColor: "rgba(255,107,0,0.1)", borderRadius: 8, alignItems: "center", paddingVertical: 12, marginTop: 4, borderWidth: 1, borderColor: themeTokens.brandPrimary, borderStyle: "dashed" },
  addExerciseBtnText: { color: themeTokens.brandPrimary, fontSize: 13, fontWeight: "800", textTransform: "uppercase" },
  modalBg: { flex: 1, backgroundColor: "rgba(0,0,0,0.7)", justifyContent: "center", padding: 20 },
  modalBox: { backgroundColor: themeTokens.surfaceElevated, borderRadius: 16, padding: 20, borderWidth: 1, borderColor: themeTokens.border },
  modalTitle: { color: themeTokens.text, fontSize: 18, fontWeight: "700", marginBottom: 16, textAlign: "center" },
  modalOption: { paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: themeTokens.border },
  modalOptionText: { color: themeTokens.text, fontSize: 16, textAlign: "center" },
  modalCancel: { marginTop: 16, padding: 14, backgroundColor: themeTokens.surfaceMuted, borderRadius: 8, alignItems: "center" },
  modalCancelText: { color: themeTokens.textMuted, fontWeight: "bold" },
  searchInput: { backgroundColor: themeTokens.surfaceMuted, color: themeTokens.text, padding: 12, borderRadius: 8, marginBottom: 12 },
});

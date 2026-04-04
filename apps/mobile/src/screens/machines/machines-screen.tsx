import React, { useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { themeTokens, radii, spacing } from "../../theme/tokens";
import { DayTabBar } from "../../components/ui/day-tab-bar";
import { MachineCard } from "../../components/ui/machine-card";
import { AVAILABLE_MACHINES } from "../../store/machine-data";

const FILTERS = ["All", "Chest", "Back", "Legs", "Shoulders", "Arms", "Cardio"];

export const MachinesScreen = () => {
  const [activeFilterIdx, setActiveFilterIdx] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const activeFilter = FILTERS[activeFilterIdx];

  const filteredMachines = AVAILABLE_MACHINES.filter(m => {
    const matchesSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === "All" || m.muscles.includes(activeFilter);
    return matchesSearch && matchesFilter;
  });

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <Text style={styles.pageTitle}>MACHINE CATALOGUE</Text>
        <View style={styles.searchBar}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput 
            style={styles.searchInput} 
            placeholder="Search machines..." 
            placeholderTextColor={themeTokens.textSoft}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <DayTabBar days={FILTERS} activeIndex={activeFilterIdx} onSelect={setActiveFilterIdx} />
        
        <View style={styles.list}>
          {filteredMachines.map((m) => (
            <MachineCard 
              key={m.id} 
              icon={m.icon} 
              name={m.name} 
              muscles={m.muscles.join(" · ")} 
              exerciseCount={m.muscles.length * 2} 
              exercises={[]} 
            />
          ))}
          {filteredMachines.length === 0 ? (
             <Text style={styles.noResults}>No machines found matching your criteria.</Text>
          ) : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: themeTokens.surface },
  scroll: { padding: spacing.lg, paddingTop: 18, paddingBottom: 100, gap: 12 },
  pageTitle: { fontSize: 20, fontWeight: "900", color: themeTokens.text, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 },
  searchBar: { flexDirection: "row", alignItems: "center", backgroundColor: themeTokens.surfaceMuted, borderRadius: 12, borderWidth: 1, borderColor: themeTokens.border, paddingHorizontal: 12 },
  searchIcon: { fontSize: 14, color: themeTokens.textMuted, marginRight: 8 },
  searchInput: { flex: 1, paddingVertical: 10, color: themeTokens.text, fontSize: 14, fontWeight: "600" },
  list: { gap: 8, marginTop: 8 },
  noResults: { color: themeTokens.textMuted, textAlign: "center", marginTop: 20, fontStyle: "italic", fontWeight: "600" }
});

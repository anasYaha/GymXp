import { Pressable, ScrollView, StyleSheet, Text } from "react-native";
import { themeTokens, radii } from "../../theme/tokens";

interface DayTabBarProps {
  days: string[];
  activeIndex: number;
  onSelect: (index: number) => void;
}

export const DayTabBar = ({ days, activeIndex, onSelect }: DayTabBarProps) => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>
      {days.map((day, i) => (
        <Pressable
          key={day}
          onPress={() => onSelect(i)}
          style={[styles.tab, i === activeIndex ? styles.tabActive : null]}
        >
          <Text style={[styles.tabText, i === activeIndex ? styles.tabTextActive : null]}>{day}</Text>
        </Pressable>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  row: { gap: 6, paddingBottom: 4 },
  tab: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: radii.md,
    backgroundColor: themeTokens.surfaceMuted,
    borderWidth: 1,
    borderColor: themeTokens.border,
  },
  tabActive: {
    backgroundColor: themeTokens.brandPrimary,
    borderColor: themeTokens.brandPrimary,
  },
  tabText: {
    fontSize: 12,
    fontWeight: "700",
    color: themeTokens.textMuted,
  },
  tabTextActive: {
    color: "#FFFFFF",
  },
});

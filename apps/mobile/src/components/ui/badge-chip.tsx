import { ScrollView, StyleSheet, Text, View } from "react-native";
import { themeTokens } from "../../theme/tokens";

interface BadgeChipProps {
  emoji: string;
  name: string;
}

interface BadgeChipRowProps {
  badges: BadgeChipProps[];
}

export const BadgeChipRow = ({ badges }: BadgeChipRowProps) => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>
      {badges.map((badge, i) => (
        <View key={i} style={styles.item}>
          <Text style={styles.emoji}>{badge.emoji}</Text>
          <Text style={styles.name}>{badge.name}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  row: { gap: 8, paddingBottom: 4 },
  item: {
    minWidth: 60,
    alignItems: "center",
  },
  emoji: { fontSize: 24, marginBottom: 2 },
  name: {
    fontSize: 10,
    fontWeight: "600",
    color: themeTokens.textMuted,
  },
});

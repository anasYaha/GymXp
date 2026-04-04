import { StyleSheet, Text, View } from "react-native";
import { themeTokens } from "../../theme/tokens";

interface BadgeTileProps {
  emoji: string;
  name: string;
  earned: boolean;
}

export const BadgeTile = ({ emoji, name, earned }: BadgeTileProps) => {
  return (
    <View style={[styles.tile, earned ? styles.earned : null]}>
      <Text style={styles.emoji}>{emoji}</Text>
      <Text style={[styles.name, earned ? styles.nameEarned : null]}>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  tile: {
    alignItems: "center",
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: themeTokens.border,
    backgroundColor: themeTokens.surfaceElevated,
  },
  earned: {
    borderColor: themeTokens.brandPrimary,
  },
  emoji: { fontSize: 22, marginBottom: 2 },
  name: {
    fontSize: 9,
    fontWeight: "700",
    color: themeTokens.textMuted,
    textAlign: "center",
  },
  nameEarned: {
    color: themeTokens.brandPrimary,
  },
});

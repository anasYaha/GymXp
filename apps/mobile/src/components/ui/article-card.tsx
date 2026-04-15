import { StyleSheet, Text, View } from "react-native";
import { themeTokens, radii } from "../../theme/tokens";

interface ArticleCardProps {
  emoji: string;
  bgTint: string;
  tag: string;
  title: string;
  readTime: string;
  views: string;
}

export const ArticleCard = ({ emoji, bgTint, tag, title, readTime, views }: ArticleCardProps) => {
  return (
    <View style={styles.card}>
      <View style={[styles.img, { backgroundColor: bgTint }]}>
        <Text style={styles.emoji}>{emoji}</Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.tag}>{tag}</Text>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.meta}>{readTime} · {views}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: themeTokens.surfaceElevated,
    borderWidth: 1,
    borderColor: themeTokens.border,
    borderRadius: radii.lg,
    overflow: "hidden",
  },
  img: {
    height: 80,
    alignItems: "center",
    justifyContent: "center",
  },
  emoji: { fontSize: 36 },
  body: { padding: 12 },
  tag: {
    fontSize: 10,
    fontWeight: "700",
    color: themeTokens.brandPrimary,
    textTransform: "uppercase",
    marginBottom: 4,
  },
  title: {
    fontSize: 14,
    fontWeight: "700",
    color: themeTokens.text,
    marginBottom: 4,
  },
  meta: {
    fontSize: 10,
    color: themeTokens.textMuted,
  },
});

import { useState } from "react";
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { themeTokens, radii, spacing } from "../../theme/tokens";
import { DayTabBar } from "../../components/ui/day-tab-bar";
import { ArticleCard } from "../../components/ui/article-card";

const FILTERS = ["All", "Tips", "Supplements", "Posing"];
const ARTICLES = [
  { emoji: "💡", bgTint: "rgba(255,107,0,0.12)", tag: "Tips", title: "5 Warm-Up Mistakes Killing Your Gains", readTime: "4 min read", views: "2.3k views" },
  { emoji: "💊", bgTint: "rgba(163,255,18,0.08)", tag: "Supplements", title: "Creatine Loading: Myth or Science?", readTime: "6 min read", views: "5.1k views" },
  { emoji: "🏆", bgTint: "rgba(255,158,64,0.1)", tag: "Posing", title: "Master the Front Double Biceps Pose", readTime: "3 min read", views: "1.8k views" },
];

interface ExploreScreenProps {
  onNavigate?: (screen: string) => void;
}

export const ExploreScreen = ({ onNavigate }: ExploreScreenProps) => {
  const [activeFilter, setActiveFilter] = useState(0);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.pageTitle}>EXPLORE</Text>

        <View style={styles.quickGrid}>
          <Pressable style={[styles.tile, styles.t1]} onPress={() => onNavigate?.("Training")}>
            <Text style={styles.tileText1}>🏋️ Training</Text>
          </Pressable>
          <Pressable style={[styles.tile, styles.t2]} onPress={() => onNavigate?.("Progress")}>
            <Text style={styles.tileText2}>📈 Progress</Text>
          </Pressable>
          <Pressable style={[styles.tile, styles.t3]} onPress={() => onNavigate?.("Nutrition")}>
            <Text style={styles.tileText1}>🍎 Nutrition</Text>
          </Pressable>
          <Pressable style={[styles.tile, styles.t4]} onPress={() => onNavigate?.("Coaching")}>
            <Text style={styles.tileText4}>👨‍🏫 Coach</Text>
          </Pressable>
        </View>

        <View style={styles.banner}>
          <Text style={styles.bannerTitle}>IRONCORE ACADEMY</Text>
          <Text style={styles.bannerSub}>Level up your gym knowledge with expert articles and tips</Text>
        </View>

        <DayTabBar days={FILTERS} activeIndex={activeFilter} onSelect={setActiveFilter} />

        <View style={styles.articleList}>
          {ARTICLES.map((a) => <ArticleCard key={a.title} {...a} />)}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: themeTokens.surface },
  scroll: { padding: spacing.lg, paddingTop: 18, paddingBottom: 100, gap: 12 },
  pageTitle: { fontSize: 20, fontWeight: "900", color: themeTokens.text, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 },
  quickGrid: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  tile: { width: "48%", borderRadius: radii.lg, paddingVertical: 16, paddingHorizontal: 12, alignItems: "center", borderWidth: 1, borderColor: themeTokens.border },
  t1: { backgroundColor: "rgba(255,107,0,0.12)" },
  t2: { backgroundColor: "rgba(163,255,18,0.08)" },
  t3: { backgroundColor: themeTokens.surfaceElevated },
  t4: { backgroundColor: "rgba(255,107,0,0.06)" },
  tileText1: { fontWeight: "800", fontSize: 14, color: themeTokens.brandPrimary },
  tileText2: { fontWeight: "800", fontSize: 14, color: themeTokens.accent },
  tileText4: { fontWeight: "800", fontSize: 14, color: themeTokens.text },
  banner: { borderRadius: radii.lg, padding: 18, borderWidth: 1, borderColor: "rgba(255,107,0,0.2)", backgroundColor: "rgba(255,107,0,0.08)" },
  bannerTitle: { fontSize: 20, fontWeight: "900", color: themeTokens.text, textTransform: "uppercase", letterSpacing: 1 },
  bannerSub: { fontSize: 12, color: themeTokens.textMuted, marginTop: 4 },
  articleList: { gap: 10 },
});

import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { themeTokens, radii, spacing } from "../../theme/tokens";
import { ChatBubble } from "../../components/ui/chat-bubble";

const MESSAGES = [
  { name: "Coach Marcus", text: "Great session yesterday! Let's focus on form for OHP today.", time: "9:15 AM", isMe: false },
  { name: "You", text: "Thanks Coach! My left shoulder was tight — should I warm up differently?", time: "9:20 AM", isMe: true },
  { name: "Coach Marcus", text: "Yes — do band pull-aparts and face pulls first. 3×15 each. I'll update your plan.", time: "9:22 AM", isMe: true },
];

export const CoachingScreen = () => {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.pageTitle}>PRIVATE COACHING</Text>

        <View style={styles.coachCard}>
          <View style={styles.coachAvatar}><Text style={styles.coachEmoji}>👨‍🏫</Text></View>
          <Text style={styles.coachName}>Coach Marcus</Text>
          <Text style={styles.coachTitle}>Strength & Conditioning Specialist</Text>
          <View style={styles.coachMeta}>
            <Text style={styles.star}>★★★★★</Text>
            <Text style={styles.rating}>4.9</Text>
            <Text style={styles.divider}>|</Text>
            <View style={styles.onlineDot} />
            <Text style={styles.onlineText}>Online now</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.secTitle}>THIS WEEK'S PLAN</Text>
          {[
            { day: "Monday — Upper A", status: "Done", done: true },
            { day: "Tuesday — Lower A", status: "Done", done: true },
            { day: "Wednesday — Rest", status: "Done", done: true },
            { day: "Thursday — Upper B", status: "Today", done: false },
            { day: "Friday — Lower B", status: "Upcoming", done: false },
          ].map((d) => (
            <View key={d.day} style={styles.dayRow}>
              <View style={[styles.dayDot, d.done ? styles.dayDotDone : null]} />
              <Text style={styles.dayText}>{d.day}</Text>
              <Text style={[styles.dayStatus, d.done ? styles.dayStatusDone : null]}>{d.status}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.secTitle}>CHAT WITH COACH</Text>
        <View style={styles.chatArea}>
          {MESSAGES.map((m, i) => <ChatBubble key={i} {...m} />)}
        </View>
        <View style={styles.inputBar}>
          <TextInput style={styles.chatInput} placeholder="Message Coach Marcus..." placeholderTextColor={themeTokens.textSoft} />
          <View style={styles.sendBtn}><Text style={{ color: "#FFF", fontSize: 18 }}>➤</Text></View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: themeTokens.surface },
  scroll: { padding: spacing.lg, paddingTop: 18, paddingBottom: 100, gap: 12 },
  pageTitle: { fontSize: 20, fontWeight: "900", color: themeTokens.text, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 },
  coachCard: { backgroundColor: themeTokens.surfaceElevated, borderWidth: 1, borderColor: themeTokens.border, borderRadius: radii.lg, padding: 18, alignItems: "center" },
  coachAvatar: { width: 72, height: 72, borderRadius: 36, borderWidth: 3, borderColor: themeTokens.brandPrimary, backgroundColor: themeTokens.surfaceElevated, alignItems: "center", justifyContent: "center", marginBottom: 8 },
  coachEmoji: { fontSize: 32 },
  coachName: { fontSize: 18, fontWeight: "800", color: themeTokens.text },
  coachTitle: { fontSize: 12, color: themeTokens.textMuted },
  coachMeta: { flexDirection: "row", gap: 6, alignItems: "center", marginTop: 4 },
  star: { color: themeTokens.brandPrimary, fontSize: 12 },
  rating: { fontSize: 12, color: themeTokens.text },
  divider: { color: themeTokens.border, fontSize: 12 },
  onlineDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: themeTokens.accent },
  onlineText: { fontSize: 12, fontWeight: "700", color: themeTokens.accent },
  card: { backgroundColor: themeTokens.surfaceElevated, borderWidth: 1, borderColor: themeTokens.border, borderRadius: radii.lg, padding: 14, gap: 2 },
  secTitle: { fontSize: 16, fontWeight: "700", color: themeTokens.text, textTransform: "uppercase", letterSpacing: 0.6, marginBottom: 6 },
  dayRow: { flexDirection: "row", alignItems: "center", gap: 8, paddingVertical: 6 },
  dayDot: { width: 10, height: 10, borderRadius: 5, borderWidth: 2, borderColor: themeTokens.border },
  dayDotDone: { backgroundColor: themeTokens.accent, borderColor: themeTokens.accent },
  dayText: { flex: 1, fontSize: 13, color: themeTokens.text },
  dayStatus: { fontSize: 11, color: themeTokens.textMuted },
  dayStatusDone: { color: themeTokens.accent, fontWeight: "700" },
  chatArea: { gap: 0 },
  inputBar: { flexDirection: "row", gap: 8, alignItems: "center" },
  chatInput: { flex: 1, paddingHorizontal: 14, paddingVertical: 10, borderRadius: 20, borderWidth: 1, borderColor: themeTokens.border, backgroundColor: themeTokens.surfaceMuted, color: themeTokens.text, fontSize: 13 },
  sendBtn: { width: 38, height: 38, borderRadius: 19, backgroundColor: themeTokens.brandPrimary, alignItems: "center", justifyContent: "center" },
});

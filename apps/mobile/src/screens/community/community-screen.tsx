import { useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { themeTokens, radii, spacing } from "../../theme/tokens";
import { DayTabBar } from "../../components/ui/day-tab-bar";
import { ChatBubble } from "../../components/ui/chat-bubble";

const ROOMS = ["General", "Nutrition", "Challenges", "Science"];
const MESSAGES = [
  { name: "Mike Steel", text: "Just hit a PR on deadlifts today! 220kg 🔥", time: "2:34 PM", isMe: false },
  { name: "You", text: "That's insane bro! What program are you running?", time: "2:35 PM", isMe: true },
  { name: "Sara Power", text: "Nice one Mike! I'm still stuck at 160kg 😅", time: "2:36 PM", isMe: false },
  { name: "You", text: "Sara you'll get there! Consistency is key 💪", time: "2:37 PM", isMe: true },
  { name: "Jake Iron", text: "Anyone else doing the 30-day challenge? Day 14 here 🎯", time: "2:40 PM", isMe: false },
];

export const CommunityScreen = () => {
  const [activeRoom, setActiveRoom] = useState(0);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <Text style={styles.pageTitle}>COMMUNITY</Text>
          <Text style={styles.memberCount}>142 members</Text>
          <View style={styles.notif}><Text style={{ fontSize: 12 }}>🔔</Text><View style={styles.ndot} /></View>
        </View>
        <DayTabBar days={ROOMS} activeIndex={activeRoom} onSelect={setActiveRoom} />
        <View style={styles.chatArea}>
          {MESSAGES.map((m, i) => (
            <ChatBubble key={i} {...m} />
          ))}
        </View>
        <View style={styles.inputBar}>
          <TextInput style={styles.chatInput} placeholder="Type a message..." placeholderTextColor={themeTokens.textSoft} />
          <View style={styles.sendBtn}><Text style={{ color: "#FFF", fontSize: 18 }}>➤</Text></View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: themeTokens.surface },
  scroll: { padding: spacing.lg, paddingTop: 18, paddingBottom: 100, gap: 12 },
  header: { flexDirection: "row", alignItems: "center", gap: 8 },
  pageTitle: { fontSize: 18, fontWeight: "900", color: themeTokens.text, textTransform: "uppercase", letterSpacing: 1, flex: 1 },
  memberCount: { fontSize: 11, color: themeTokens.textMuted, fontWeight: "600" },
  notif: { width: 28, height: 28, borderRadius: 14, backgroundColor: themeTokens.surfaceElevated, borderWidth: 1, borderColor: themeTokens.border, alignItems: "center", justifyContent: "center" },
  ndot: { position: "absolute", top: 2, right: 2, width: 8, height: 8, borderRadius: 4, backgroundColor: themeTokens.brandPrimary },
  chatArea: { gap: 0 },
  inputBar: { flexDirection: "row", gap: 8, alignItems: "center" },
  chatInput: { flex: 1, paddingHorizontal: 14, paddingVertical: 10, borderRadius: 20, borderWidth: 1, borderColor: themeTokens.border, backgroundColor: themeTokens.surfaceMuted, color: themeTokens.text, fontSize: 13 },
  sendBtn: { width: 38, height: 38, borderRadius: 19, backgroundColor: themeTokens.brandPrimary, alignItems: "center", justifyContent: "center" },
});

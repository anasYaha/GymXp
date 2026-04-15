import type { DashboardSummaryResponse } from "@gymxp/shared-types/contracts/dashboard";
import type { MemberSession } from "@gymxp/shared-types/contracts/sessions";
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { useTrainingContext, DayName } from "../../store/training-store";

import { SessionOptionCard } from "../../components/sessions/session-option-card";
import { HeroCard } from "../../components/ui/hero-card";
import { StatCard } from "../../components/ui/stat-card";
import { StreakBanner } from "../../components/ui/streak-banner";
import { WorkoutCard } from "../../components/ui/workout-card";
import { BadgeChipRow } from "../../components/ui/badge-chip";
import { XpProgressBar } from "../../components/ui/xp-progress-bar";
import { themeTokens, spacing, radii } from "../../theme/tokens";
import { completeWorkoutRoutine } from "../../features/session/session.service";
import { useState } from "react";

interface DashboardScreenProps {
  summary: DashboardSummaryResponse;
  sessions: MemberSession[];
  sessionError?: string | null;
  checkingInSessionId?: string | null;
  onCheckIn: (sessionId: string) => Promise<void>;
  onLogout: () => Promise<void>;
  onNavigateToSession?: () => void;
}

const formatSessionTime = (value: string) => {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    hour: "numeric",
    minute: "2-digit"
  }).format(new Date(value));
};

const DEMO_BADGES = [
  { emoji: "🏆", name: "Champion" },
  { emoji: "🔥", name: "On Fire" },
  { emoji: "💎", name: "Diamond" },
  { emoji: "⚡", name: "Lightning" },
  { emoji: "🎯", name: "Sniper" },
  { emoji: "🦁", name: "Beast" },
];

export const DashboardScreen = ({
  summary,
  sessions,
  sessionError,
  checkingInSessionId,
  onCheckIn,
  onLogout,
  onNavigateToSession,
  onRefresh
}: DashboardScreenProps & { onRefresh?: () => Promise<void> }) => {
  const { state } = useTrainingContext();
  const [isCompleting, setIsCompleting] = useState(false);
  const [completeSuccess, setCompleteSuccess] = useState(false);
  const [completionReward, setCompletionReward] = useState<number | null>(null);

  const xp = summary.stats.xp;
  const currentLevel = summary.progress.currentLevel;
  const xpInLevel = summary.progress.xpInLevel;
  const xpMax = summary.progress.xpRequiredForNextLevel;
  const streak = summary.stats.streak;

  const days: DayName[] = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const currentDayName = days[new Date().getDay()];
  const todayWorkout = state.days.find((d) => d.day === currentDayName);

  const hasWorkout = todayWorkout && todayWorkout.type !== "Rest" && todayWorkout.exercises.length > 0;

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.greeting}>
            <Text style={styles.greetingText}>Good evening, <Text style={styles.greetingName}>{summary.user.fullName}</Text></Text>
          </View>
          <View style={styles.notif}>
            <Text style={{ fontSize: 14 }}>🔔</Text>
            <View style={styles.ndot} />
          </View>
        </View>

        {/* Hero Card */}
        <HeroCard
          eyebrow="IRON WARRIOR"
          title={`LEVEL ${currentLevel} · IRON WARRIOR`}
          subtitle={`Avatar Skin: Shadow Titan`}
        >
          <XpProgressBar
            current={xpInLevel}
            max={xpMax}
            label={`${xpInLevel}/${xpMax} XP • ${summary.progress.completedDaysInLevel}/${summary.progress.completedDaysRequiredForNextLevel} days`}
          />
        </HeroCard>

        {/* Stat Grid */}
        <View style={styles.statGrid}>
          <StatCard value={streak} label="🔥 Streak" color={themeTokens.brandPrimary} borderColor={themeTokens.brandPrimary} />
          <StatCard value={summary.stats.checkIns} label="Sessions" />
          <StatCard value={summary.today.sameDayUsers ?? 0} label="Same Day" color={themeTokens.accent} />
        </View>

        {/* Streak Banner */}
        <StreakBanner days={streak} nextRewardAt={21} />

        {/* Today's Workout */}
        <View style={styles.secRow}>
          <Text style={styles.secTitle}>TODAY'S WORKOUT</Text>
          <Text style={styles.seeAll}>{currentDayName}</Text>
        </View>
        
        {hasWorkout && todayWorkout ? (
          <View style={styles.workoutList}>
            <Pressable onPress={onNavigateToSession}>
              <WorkoutCard 
                icon="🏋️"
                name={todayWorkout.type + " Day"}
                muscles={`${todayWorkout.exercises.length} exercises scheduled`}
                status="start"
              />
            </Pressable>
            {todayWorkout.exercises.map((ex) => (
               <View key={ex.id} style={styles.miniExerciseRow}>
                 <Text style={styles.miniExerciseName}>{ex.name}</Text>
                 <Text style={styles.miniExerciseSets}>{ex.sets} sets</Text>
               </View>
            ))}

            <Pressable 
              disabled={isCompleting || completeSuccess}
              onPress={async () => {
                setIsCompleting(true);
                try {
                  const result = await completeWorkoutRoutine(todayWorkout.type);
                  setCompletionReward(result.xpAwarded);
                  setCompleteSuccess(true);
                  if (onRefresh) await onRefresh();
                } catch (e) {
                  console.error(e);
                } finally {
                  setIsCompleting(false);
                }
              }}
              style={[
                styles.completeButton,
                completeSuccess && { backgroundColor: themeTokens.accent }
              ]}
            >
              <Text style={styles.completeButtonText}>
                {isCompleting ? "SAVING..." : completeSuccess ? `DONE! +${completionReward ?? 0} XP` : "FINISH SESSION"}
              </Text>
            </Pressable>
          </View>
        ) : (
          <View style={styles.emptyWorkoutCard}>
            <Text style={styles.emptyWorkoutTitle}>No Session Scheduled</Text>
            <Text style={styles.emptyWorkoutSub}>It's a rest day, or you haven't set up your training plan yet.</Text>
          </View>
        )}

        {/* Badges */}
        <View style={styles.secRow}>
          <Text style={styles.secTitle}>BADGES</Text>
          <Text style={styles.seeAll}>See All</Text>
        </View>
        <BadgeChipRow badges={DEMO_BADGES} />

        {/* Live Sessions */}
        {sessions.length > 0 ? (
          <>
            <View style={styles.secRow}>
              <Text style={styles.secTitle}>UPCOMING SESSIONS</Text>
              <Text style={styles.seeAll}>{sessions.length} live</Text>
            </View>
            {sessionError ? <Text style={styles.errorText}>{sessionError}</Text> : null}
            {sessions.map((session) => (
              <SessionOptionCard
                key={session.id}
                loading={checkingInSessionId === session.id}
                onCheckIn={(sessionId) => { void onCheckIn(sessionId); }}
                session={session}
                timingLabel={formatSessionTime(session.startsAt)}
              />
            ))}
          </>
        ) : null}

        {/* Logout */}
        <Pressable onPress={onLogout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Log out</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: themeTokens.surface },
  scroll: { padding: spacing.lg, paddingTop: 18, paddingBottom: 100, gap: 12 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 2 },
  greeting: { flex: 1 },
  greetingText: { fontSize: 14, fontWeight: "600", color: themeTokens.textMuted },
  greetingName: { color: themeTokens.text, fontWeight: "700" },
  notif: { width: 32, height: 32, borderRadius: 16, backgroundColor: themeTokens.surfaceElevated, borderWidth: 1, borderColor: themeTokens.border, alignItems: "center", justifyContent: "center" },
  ndot: { position: "absolute", top: 2, right: 2, width: 8, height: 8, borderRadius: 4, backgroundColor: themeTokens.brandPrimary },
  statGrid: { flexDirection: "row", gap: 8 },
  secRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 8 },
  secTitle: { fontSize: 16, fontWeight: "700", color: themeTokens.text, textTransform: "uppercase", letterSpacing: 0.6 },
  seeAll: { fontSize: 12, fontWeight: "700", color: themeTokens.brandPrimary, textTransform: "uppercase" },
  workoutList: { gap: 8 },
  miniExerciseRow: { flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 12, paddingVertical: 8, backgroundColor: themeTokens.surfaceMuted, borderRadius: 8 },
  miniExerciseName: { color: themeTokens.text, fontSize: 13, fontWeight: "600" },
  miniExerciseSets: { color: themeTokens.textMuted, fontSize: 12, fontWeight: "700" },
  emptyWorkoutCard: { backgroundColor: themeTokens.surfaceMuted, padding: 20, borderRadius: radii.lg, alignItems: "center", borderStyle: "dashed", borderWidth: 1, borderColor: themeTokens.border },
  emptyWorkoutTitle: { color: themeTokens.text, fontSize: 15, fontWeight: "700", marginBottom: 4 },
  emptyWorkoutSub: { color: themeTokens.textMuted, fontSize: 13, textAlign: "center" },
  errorText: { color: themeTokens.danger, fontSize: 14, fontWeight: "600" },
  logoutButton: { alignItems: "center", paddingVertical: 8, marginTop: 12 },
  logoutText: { color: themeTokens.textMuted, fontWeight: "700", fontSize: 15 },
  completeButton: { 
    backgroundColor: themeTokens.brandPrimary, 
    paddingVertical: 12, 
    borderRadius: radii.md, 
    alignItems: "center", 
    marginTop: 8,
    shadowColor: themeTokens.brandPrimary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4
  },
  completeButtonText: { color: "#FFFFFF", fontWeight: "800", fontSize: 14, letterSpacing: 1 },
});

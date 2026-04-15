import type { MemberSession } from "@gymxp/shared-types/contracts/sessions";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { themeTokens } from "../../theme/tokens";

interface SessionOptionCardProps {
  session: MemberSession;
  timingLabel: string;
  onCheckIn: (sessionId: string) => void;
  loading?: boolean;
}

const formatDuration = (startsAt: string, endsAt: string) => {
  const durationMs = new Date(endsAt).getTime() - new Date(startsAt).getTime();
  const minutes = Math.max(0, Math.round(durationMs / 60000));
  return `${minutes} min`;
};

export const SessionOptionCard = ({
  session,
  timingLabel,
  onCheckIn,
  loading = false
}: SessionOptionCardProps) => {
  const disabled = session.checkedIn || loading;

  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <View style={styles.titleBlock}>
          <View style={styles.categoryChip}>
            <Text style={styles.categoryText}>Upcoming session</Text>
          </View>
          <Text style={styles.title}>{session.title}</Text>
        </View>
        <View style={styles.timeBadge}>
          <Text style={styles.timeLabel}>{timingLabel}</Text>
        </View>
      </View>

      <View style={styles.metaRow}>
        <View style={styles.metaPill}>
          <Text style={styles.metaLabel}>Duration</Text>
          <Text style={styles.metaValue}>{formatDuration(session.startsAt, session.endsAt)}</Text>
        </View>
        <View style={styles.metaPill}>
          <Text style={styles.metaLabel}>Coach</Text>
          <Text style={styles.metaValue}>{session.coachName ?? "Gym floor"}</Text>
        </View>
      </View>

      <View style={styles.metaRow}>
        <View style={styles.metaPill}>
          <Text style={styles.metaLabel}>Capacity</Text>
          <Text style={styles.metaValue}>{session.capacity ?? "Open"}</Text>
        </View>
      </View>

      {session.description ? <Text style={styles.description}>{session.description}</Text> : null}

      <Pressable
        disabled={disabled}
        onPress={() => onCheckIn(session.id)}
        style={[styles.button, disabled ? styles.buttonDisabled : null]}
      >
        <Text style={[styles.buttonText, disabled ? styles.buttonTextDisabled : null]}>
          {session.checkedIn ? "Checked in" : loading ? "Checking in..." : "Check in"}
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: themeTokens.surfaceElevated,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: themeTokens.border,
    padding: 18,
    gap: 14,
    elevation: 0
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 12
  },
  titleBlock: {
    flex: 1,
    gap: 10
  },
  categoryChip: {
    alignSelf: "flex-start",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: themeTokens.brandPrimarySoft
  },
  categoryText: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.3,
    textTransform: "uppercase",
    color: themeTokens.brandPrimary
  },
  title: {
    color: themeTokens.text,
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "800"
  },
  timeBadge: {
    backgroundColor: themeTokens.brandPrimarySoft,
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 10,
    minWidth: 92
  },
  timeLabel: {
    color: themeTokens.brandPrimary,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "700",
    textAlign: "center"
  },
  metaRow: {
    flexDirection: "row",
    gap: 10
  },
  metaPill: {
    flex: 1,
    backgroundColor: themeTokens.surfaceMuted,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: themeTokens.border,
    paddingHorizontal: 14,
    paddingVertical: 12,
    gap: 2
  },
  metaLabel: {
    color: themeTokens.textSoft,
    fontSize: 11,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.5
  },
  metaValue: {
    color: themeTokens.text,
    fontSize: 14,
    fontWeight: "700"
  },
  description: {
    color: themeTokens.textMuted,
    fontSize: 14,
    lineHeight: 21
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: themeTokens.border,
    backgroundColor: "#1E1E1E",
    minHeight: 46
  },
  buttonDisabled: {
    backgroundColor: themeTokens.accentSoft,
    borderColor: "#2A3A15"
  },
  buttonText: {
    color: themeTokens.brandPrimary,
    fontSize: 14,
    fontWeight: "700"
  },
  buttonTextDisabled: {
    color: themeTokens.accent
  }
});

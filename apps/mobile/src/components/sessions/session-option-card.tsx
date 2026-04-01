import type { BranchSessionOption } from "@gymxp/shared-types/contracts/sessions";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { themeTokens } from "../../theme/tokens";

interface SessionOptionCardProps {
  session: BranchSessionOption;
  timingLabel: string;
  onCheckIn: (sessionId: string) => void;
  loading?: boolean;
}

const getCategoryTone = (muscleGroup: string) => {
  const normalized = muscleGroup.trim().toLowerCase();

  if (normalized.includes("cardio")) {
    return { chip: "#E8F5EC", text: "#1B6A4A" };
  }

  if (normalized.includes("core")) {
    return { chip: "#FFF1D8", text: "#8A5A00" };
  }

  if (normalized.includes("strength")) {
    return { chip: "#E8EEFB", text: "#274690" };
  }

  return { chip: themeTokens.surfaceMuted, text: themeTokens.brandPrimary };
};

export const SessionOptionCard = ({
  session,
  timingLabel,
  onCheckIn,
  loading = false
}: SessionOptionCardProps) => {
  const disabled = session.checkedIn || loading;
  const tone = getCategoryTone(session.muscleGroup);

  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <View style={styles.titleBlock}>
          <View style={[styles.categoryChip, { backgroundColor: tone.chip }]}>
            <Text style={[styles.categoryText, { color: tone.text }]}>{session.muscleGroup}</Text>
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
          <Text style={styles.metaValue}>{session.durationMins} min</Text>
        </View>
        <View style={styles.metaPill}>
          <Text style={styles.metaLabel}>Coach</Text>
          <Text style={styles.metaValue}>{session.coachName ?? "Gym floor"}</Text>
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
    shadowColor: "#000000",
    shadowOpacity: 0.05,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 6
    },
    elevation: 2
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
    paddingVertical: 5
  },
  categoryText: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.3,
    textTransform: "uppercase"
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
    color: themeTokens.brandPrimaryStrong,
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
    backgroundColor: "#F9FBFA",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E9F0ED",
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
    borderColor: themeTokens.borderStrong,
    backgroundColor: "#F7FBF9",
    minHeight: 46
  },
  buttonDisabled: {
    backgroundColor: themeTokens.successSoft,
    borderColor: "#C9E3D4"
  },
  buttonText: {
    color: themeTokens.brandPrimaryStrong,
    fontSize: 14,
    fontWeight: "700"
  },
  buttonTextDisabled: {
    color: "#2C7A56"
  }
});

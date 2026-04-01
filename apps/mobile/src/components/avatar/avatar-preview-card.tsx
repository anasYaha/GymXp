import { StyleSheet, Text, View } from "react-native";

import { themeTokens } from "../../theme/tokens";
import type { AvatarProfile } from "../../types/avatar/avatar";

interface AvatarPreviewCardProps {
  profile: AvatarProfile;
  title?: string;
  subtitle?: string;
}

export const AvatarPreviewCard = ({
  profile,
  title = "Avatar preview",
  subtitle = "Lightweight placeholder preview while native avatar rendering is paused."
}: AvatarPreviewCardProps) => {
  return (
    <View style={styles.card}>
      <View style={styles.previewStage}>
        <Text style={styles.previewEyebrow}>Placeholder preview</Text>
        <View style={styles.avatarBadge}>
          <Text style={styles.avatarGlyph}>GX</Text>
        </View>
        <Text style={styles.previewTitle}>GymXP member avatar</Text>
        <Text style={styles.previewMeta}>
          Preset: {profile.selectedAvatarModel} | Mood: {profile.mood}
        </Text>
      </View>
      <View style={styles.copy}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
      <View style={styles.grid}>
        <View style={styles.metaPill}>
          <Text style={styles.metaLabel}>Build</Text>
          <Text style={styles.metaValue}>{profile.bodyBuildPreset}</Text>
        </View>
        <View style={styles.metaPill}>
          <Text style={styles.metaLabel}>Outfit</Text>
          <Text style={styles.metaValue}>{profile.outfit}</Text>
        </View>
        <View style={styles.metaPill}>
          <Text style={styles.metaLabel}>Hair</Text>
          <Text style={styles.metaValue}>{profile.hairStyle}</Text>
        </View>
        <View style={styles.metaPill}>
          <Text style={styles.metaLabel}>Beard</Text>
          <Text style={styles.metaValue}>{profile.beardStyle}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: themeTokens.border,
    padding: 18,
    gap: 16
  },
  previewStage: {
    minHeight: 220,
    borderRadius: 20,
    backgroundColor: "#134E46",
    padding: 18,
    alignItems: "center",
    justifyContent: "center",
    gap: 12
  },
  avatarBadge: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 6,
    borderColor: "#D3ECE6"
  },
  avatarGlyph: {
    color: "#134E46",
    fontSize: 30,
    fontWeight: "800",
    letterSpacing: 1
  },
  previewEyebrow: {
    color: "#D3ECE6",
    fontSize: 11,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 1
  },
  previewTitle: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "800",
    textAlign: "center"
  },
  previewMeta: {
    color: "#E5F2EE",
    fontSize: 14,
    lineHeight: 20,
    textAlign: "center"
  },
  copy: {
    gap: 6
  },
  title: {
    color: themeTokens.text,
    fontSize: 20,
    fontWeight: "800"
  },
  subtitle: {
    color: themeTokens.textMuted,
    fontSize: 14,
    lineHeight: 20
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10
  },
  metaPill: {
    width: "47%",
    backgroundColor: "#F8FBFA",
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
    textTransform: "uppercase"
  },
  metaValue: {
    color: themeTokens.text,
    fontSize: 14,
    fontWeight: "700"
  }
});

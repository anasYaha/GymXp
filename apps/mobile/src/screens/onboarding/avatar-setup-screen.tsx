import { StyleSheet, Text, View } from "react-native";

import { AvatarPreviewCard } from "../../components/avatar/avatar-preview-card";
import { AvatarSetupStepper } from "../../components/avatar/avatar-setup-stepper";
import { PrimaryButton } from "../../components/common/primary-button";
import { ScreenShell } from "../../components/common/screen-shell";
import { SectionHeader } from "../../components/common/section-header";
import { defaultAvatarProfile } from "../../constants/avatar/avatar-options";
import { useAvatarProfile } from "../../hooks/avatar/use-avatar-profile";
import { themeTokens } from "../../theme/tokens";

interface AvatarSetupScreenProps {
  onFinish?: () => void;
}

export const AvatarSetupScreen = ({ onFinish }: AvatarSetupScreenProps) => {
  const { previewLabel, profile } = useAvatarProfile(defaultAvatarProfile);

  return (
    <ScreenShell
      title="Avatar setup"
      subtitle="Avatar setup stays scaffolded here while native 3D rendering is paused for build stability."
    >
      <AvatarSetupStepper currentStep="avatar-setup" />
      <AvatarPreviewCard
        profile={profile}
        subtitle="This fake preview keeps the onboarding flow intact without requiring any native avatar renderer."
        title="Avatar preview placeholder"
      />
      <View style={styles.card}>
        <SectionHeader
          eyebrow="Stub"
          title="Avatar configuration"
          subtitle="The typed avatar profile already exists, so this screen only needs real controls and rendering later."
        />
        <View style={styles.field}>
          <Text style={styles.fieldLabel}>Current preview state</Text>
          <Text style={styles.fieldValue}>{previewLabel}</Text>
        </View>
        <Text style={styles.helperText}>
          Planned controls: model selector, body preset, visual customizations, mood, and animation testing.
        </Text>
        <PrimaryButton
          disabled={!onFinish}
          label="Finish setup"
          onPress={() => {
            onFinish?.();
          }}
        />
      </View>
    </ScreenShell>
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
  field: {
    gap: 6
  },
  fieldLabel: {
    color: themeTokens.text,
    fontSize: 13,
    fontWeight: "700",
    textTransform: "uppercase"
  },
  fieldValue: {
    color: themeTokens.textMuted,
    fontSize: 14,
    lineHeight: 20
  },
  helperText: {
    color: themeTokens.textMuted,
    fontSize: 14,
    lineHeight: 20
  }
});

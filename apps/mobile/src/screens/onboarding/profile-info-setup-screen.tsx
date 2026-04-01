import { StyleSheet, Text, View } from "react-native";

import { PrimaryButton } from "../../components/common/primary-button";
import { ScreenShell } from "../../components/common/screen-shell";
import { SectionHeader } from "../../components/common/section-header";
import { AvatarSetupStepper } from "../../components/avatar/avatar-setup-stepper";
import { themeTokens } from "../../theme/tokens";

interface ProfileInfoSetupScreenProps {
  onNext?: () => void;
}

export const ProfileInfoSetupScreen = ({ onNext }: ProfileInfoSetupScreenProps) => {
  return (
    <ScreenShell
      title="Profile setup"
      subtitle="Future onboarding step for member identity, display preferences, and profile basics."
    >
      <AvatarSetupStepper currentStep="profile-info" />
      <View style={styles.card}>
        <SectionHeader
          eyebrow="Stub"
          title="Profile info step"
          subtitle="This screen is intentionally lightweight for now and will later collect member bio fields before avatar generation."
        />
        <View style={styles.field}>
          <Text style={styles.fieldLabel}>Planned inputs</Text>
          <Text style={styles.fieldValue}>Display name, age range, city, and member-facing identity details.</Text>
        </View>
        <PrimaryButton
          disabled={!onNext}
          label="Continue"
          onPress={() => {
            onNext?.();
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
  }
});

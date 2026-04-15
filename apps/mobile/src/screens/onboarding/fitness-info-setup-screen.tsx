import { StyleSheet, Text, View } from "react-native";

import { PrimaryButton } from "../../components/common/primary-button";
import { ScreenShell } from "../../components/common/screen-shell";
import { SectionHeader } from "../../components/common/section-header";
import { AvatarSetupStepper } from "../../components/avatar/avatar-setup-stepper";
import { themeTokens } from "../../theme/tokens";
import { getAvatarAnimationForExercise } from "../../utils/avatar/get-avatar-animation-for-exercise";

interface FitnessInfoSetupScreenProps {
  onNext?: () => void;
}

export const FitnessInfoSetupScreen = ({ onNext }: FitnessInfoSetupScreenProps) => {
  const suggestedAnimation = getAvatarAnimationForExercise("strength");

  return (
    <ScreenShell
      title="Fitness setup"
      subtitle="Future onboarding step for training goals, preferences, and avatar behavior hints."
    >
      <AvatarSetupStepper currentStep="fitness-info" />
      <View style={styles.card}>
        <SectionHeader
          eyebrow="Stub"
          title="Fitness info step"
          subtitle="This step will later collect goals and workout preferences that can help personalize the avatar's default animation behavior."
        />
        <View style={styles.field}>
          <Text style={styles.fieldLabel}>Suggested default animation</Text>
          <Text style={styles.fieldValue}>{suggestedAnimation}</Text>
        </View>
        <View style={styles.field}>
          <Text style={styles.fieldLabel}>Planned inputs</Text>
          <Text style={styles.fieldValue}>Goal, experience level, favorite class type, and preferred training energy.</Text>
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
    backgroundColor: themeTokens.surfaceElevated,
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

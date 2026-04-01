import { StyleSheet, Text, View } from "react-native";

import { avatarSetupSteps } from "../../constants/avatar/avatar-options";
import { themeTokens } from "../../theme/tokens";
import type { AvatarSetupStep } from "../../types/avatar/avatar";

interface AvatarSetupStepperProps {
  currentStep: AvatarSetupStep;
}

export const AvatarSetupStepper = ({ currentStep }: AvatarSetupStepperProps) => {
  return (
    <View style={styles.row}>
      {avatarSetupSteps.map((step, index) => {
        const active = step.key === currentStep;

        return (
          <View key={step.key} style={styles.item}>
            <View style={[styles.badge, active ? styles.badgeActive : null]}>
              <Text style={[styles.badgeText, active ? styles.badgeTextActive : null]}>{index + 1}</Text>
            </View>
            <Text style={[styles.label, active ? styles.labelActive : null]}>{step.title}</Text>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10
  },
  item: {
    flex: 1,
    alignItems: "center",
    gap: 8
  },
  badge: {
    width: 32,
    height: 32,
    borderRadius: 999,
    backgroundColor: "#EAF2EF",
    borderWidth: 1,
    borderColor: themeTokens.border,
    alignItems: "center",
    justifyContent: "center"
  },
  badgeActive: {
    backgroundColor: themeTokens.brandPrimary,
    borderColor: themeTokens.brandPrimary
  },
  badgeText: {
    color: themeTokens.textSoft,
    fontSize: 13,
    fontWeight: "700"
  },
  badgeTextActive: {
    color: "#FFFFFF"
  },
  label: {
    color: themeTokens.textSoft,
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center"
  },
  labelActive: {
    color: themeTokens.text
  }
});

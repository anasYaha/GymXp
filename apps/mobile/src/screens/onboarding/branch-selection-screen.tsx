import type { GymBranch } from "@gymxp/shared-types/entities/brand";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { PrimaryButton } from "../../components/common/primary-button";
import { BranchPickerField } from "../../components/forms/branch-picker-field";
import { ScreenShell } from "../../components/common/screen-shell";
import { themeTokens } from "../../theme/tokens";

interface BranchSelectionScreenProps {
  branches: GymBranch[];
  onSubmit: (branchId: string) => Promise<void>;
  loading: boolean;
  error: string | null;
}

export const BranchSelectionScreen = ({
  branches,
  onSubmit,
  loading,
  error
}: BranchSelectionScreenProps) => {
  const [selectedBranchId, setSelectedBranchId] = useState<string | null>(branches[0]?.id ?? null);

  return (
    <ScreenShell
      title="Choose your branch"
      subtitle="Your dashboard, XP, streaks, and available sessions are all scoped to the branch you choose here."
    >
      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>Your gym identity starts here</Text>
        <Text style={styles.infoText}>
          Pick the branch you want to demo. Attendance, progress, and session availability will update to match it.
        </Text>
      </View>
      <BranchPickerField
        branches={branches}
        onSelect={setSelectedBranchId}
        selectedBranchId={selectedBranchId}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <PrimaryButton
        disabled={!selectedBranchId}
        label="Continue to dashboard"
        loading={loading}
        onPress={() => {
          if (selectedBranchId) {
            void onSubmit(selectedBranchId);
          }
        }}
      />
    </ScreenShell>
  );
};

const styles = StyleSheet.create({
  infoCard: {
    backgroundColor: themeTokens.brandPrimarySoft,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: themeTokens.border,
    padding: 18,
    gap: 6
  },
  infoTitle: {
    color: themeTokens.text,
    fontSize: 18,
    fontWeight: "800"
  },
  infoText: {
    color: themeTokens.textMuted,
    fontSize: 14,
    lineHeight: 20
  },
  error: {
    color: themeTokens.danger,
    fontSize: 14,
    fontWeight: "600"
  }
});

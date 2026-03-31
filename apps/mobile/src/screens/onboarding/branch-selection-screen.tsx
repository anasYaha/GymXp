import type { GymBranch } from "@gymxp/shared-types/entities/brand";
import { useState } from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text } from "react-native";

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
      title="Choose Your Branch"
      subtitle="Your dashboard, XP, streaks, and activity are all scoped to this branch."
    >
      <BranchPickerField
        branches={branches}
        onSelect={setSelectedBranchId}
        selectedBranchId={selectedBranchId}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Pressable
        disabled={!selectedBranchId || loading}
        onPress={() => selectedBranchId && onSubmit(selectedBranchId)}
        style={styles.primaryButton}
      >
        {loading ? (
          <ActivityIndicator color="#ffffff" />
        ) : (
          <Text style={styles.primaryText}>Continue to dashboard</Text>
        )}
      </Pressable>
    </ScreenShell>
  );
};

const styles = StyleSheet.create({
  error: {
    color: "#a33434"
  },
  primaryButton: {
    backgroundColor: themeTokens.brandPrimary,
    borderRadius: 14,
    minHeight: 52,
    alignItems: "center",
    justifyContent: "center"
  },
  primaryText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700"
  }
});

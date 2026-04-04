import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { PrimaryButton } from "../../components/common/primary-button";
import { ScreenShell } from "../../components/common/screen-shell";
import { getBranches, selectBranch } from "../../features/branch/branch.service";
import { authStore } from "../../features/auth/auth.store";
import { themeTokens } from "../../theme/tokens";

export const BranchSelectionScreen = () => {
  const [branches, setBranches] = useState<Awaited<ReturnType<typeof getBranches>>["items"]>([]);
  const [selectedBranchId, setSelectedBranchId] = useState<string | null>(authStore.user?.currentBranchId ?? null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let isMounted = true;

    void getBranches()
      .then((branchResponse) => {
        if (!isMounted) {
          return;
        }

        setBranches(branchResponse.items);

        if (!selectedBranchId && branchResponse.items[0]) {
          setSelectedBranchId(branchResponse.items[0].id);
        }
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleConfirmSelection = async () => {
    if (!selectedBranchId) {
      return;
    }

    try {
      setSaving(true);
      await selectBranch({ branchId: selectedBranchId });
    } finally {
      setSaving(false);
    }
  };

  return ScreenShell({
    title: "Select branch",
    subtitle: "Everything in your member experience stays inside your gym branch.",
    children: (
      <View style={styles.content}>
        <Text style={styles.helperText}>Choose your branch. Your dashboard, sessions, and leaderboard stay scoped here.</Text>
        {branches.map((branch) => {
          const isSelected = branch.id === selectedBranchId;

          return (
            <Pressable
              key={branch.id}
              onPress={() => setSelectedBranchId(branch.id)}
              style={[styles.option, isSelected ? styles.optionSelected : null]}
            >
              <Text style={styles.optionTitle}>{branch.name}</Text>
              <Text style={styles.optionSubtitle}>{branch.city}</Text>
            </Pressable>
          );
        })}
        <PrimaryButton
          label={loading ? "Loading branches..." : "Confirm branch"}
          loading={saving}
          onPress={() => {
            void handleConfirmSelection();
          }}
        />
      </View>
    )
  });
};

const styles = StyleSheet.create({
  content: {
    gap: 12
  },
  helperText: {
    color: themeTokens.textMuted,
    fontSize: 14,
    lineHeight: 20
  },
  option: {
    backgroundColor: themeTokens.surfaceElevated,
    borderColor: themeTokens.border,
    borderRadius: 18,
    borderWidth: 1,
    padding: 16
  },
  optionSelected: {
    borderColor: themeTokens.brandPrimary
  },
  optionTitle: {
    color: themeTokens.text,
    fontSize: 16,
    fontWeight: "700"
  },
  optionSubtitle: {
    color: themeTokens.textMuted,
    fontSize: 13,
    marginTop: 4
  }
});


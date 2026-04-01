import type { GymBranch } from "@gymxp/shared-types/entities/brand";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { themeTokens } from "../../theme/tokens";

interface BranchPickerFieldProps {
  branches: GymBranch[];
  selectedBranchId: string | null;
  onSelect: (branchId: string) => void;
}

export const BranchPickerField = ({
  branches,
  selectedBranchId,
  onSelect
}: BranchPickerFieldProps) => {
  return (
    <View style={styles.wrapper}>
      {branches.map((branch) => {
        const selected = selectedBranchId === branch.id;

        return (
          <Pressable
            key={branch.id}
            onPress={() => onSelect(branch.id)}
            style={[styles.option, selected ? styles.selected : null]}
          >
            <View style={styles.headerRow}>
              <Text style={styles.name}>{branch.name}</Text>
              {selected ? (
                <View style={styles.selectedBadge}>
                  <Text style={styles.selectedBadgeText}>Selected</Text>
                </View>
              ) : null}
            </View>
            <Text style={styles.meta}>
              {branch.city}
              {branch.address ? ` • ${branch.address}` : ""}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    gap: 12
  },
  option: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: themeTokens.border,
    padding: 18,
    gap: 8
  },
  selected: {
    borderColor: themeTokens.brandPrimary,
    backgroundColor: "#EBF4F2"
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12
  },
  name: {
    color: themeTokens.text,
    fontSize: 17,
    fontWeight: "800",
    flex: 1
  },
  meta: {
    color: themeTokens.textMuted,
    fontSize: 14,
    lineHeight: 20
  },
  selectedBadge: {
    backgroundColor: themeTokens.brandPrimary,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  selectedBadgeText: {
    color: "#ffffff",
    fontSize: 11,
    fontWeight: "700"
  }
});

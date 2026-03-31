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
            <Text style={styles.name}>{branch.name}</Text>
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
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#d8e4df",
    padding: 16,
    gap: 4
  },
  selected: {
    borderColor: themeTokens.brandPrimary,
    backgroundColor: "#ebf4f2"
  },
  name: {
    color: themeTokens.text,
    fontSize: 17,
    fontWeight: "700"
  },
  meta: {
    color: "#55736d",
    fontSize: 14
  }
});

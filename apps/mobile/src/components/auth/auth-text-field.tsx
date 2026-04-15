import type { ComponentProps } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

import { themeTokens } from "../../theme/tokens";

type AuthTextFieldProps = {
  label: string;
} & ComponentProps<typeof TextInput>;

export const AuthTextField = ({ label, style, ...props }: AuthTextFieldProps) => {
  return (
    <View style={styles.field}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TextInput
        placeholderTextColor={themeTokens.textSoft}
        selectionColor={themeTokens.brandPrimary}
        style={[styles.input, style]}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  field: {
    gap: 8
  },
  fieldLabel: {
    color: themeTokens.textMuted,
    fontSize: 13,
    fontWeight: "700"
  },
  input: {
    backgroundColor: themeTokens.surfaceMuted,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: themeTokens.border,
    color: themeTokens.text,
    paddingHorizontal: 16,
    paddingVertical: 14
  }
});
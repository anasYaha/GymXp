import { Pressable, StyleSheet, Text } from "react-native";

import { themeTokens } from "../../theme/tokens";

interface AuthModeLinkProps {
  hint?: string;
  label: string;
  disabled?: boolean;
  onPress: () => void;
}

export const AuthModeLink = ({ hint, label, disabled = false, onPress }: AuthModeLinkProps) => {
  return (
    <Pressable disabled={disabled} onPress={onPress} style={styles.button}>
      {hint ? <Text style={[styles.hint, disabled ? styles.disabledText : null]}>{hint}</Text> : null}
      <Text style={[styles.label, disabled ? styles.disabledText : null]}>{label}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    gap: 4
  },
  hint: {
    color: themeTokens.textSoft,
    fontSize: 13
  },
  label: {
    color: themeTokens.brandPrimary,
    fontSize: 15,
    fontWeight: "600"
  },
  disabledText: {
    color: themeTokens.textSoft
  }
});
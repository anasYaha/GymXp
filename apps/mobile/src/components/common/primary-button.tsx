import type { ReactNode } from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text } from "react-native";

import { themeTokens } from "../../theme/tokens";

interface PrimaryButtonProps {
  label: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  variant?: "solid" | "soft";
  accessory?: ReactNode;
}

export const PrimaryButton = ({
  label,
  onPress,
  loading = false,
  disabled = false,
  variant = "solid",
  accessory
}: PrimaryButtonProps) => {
  const isDisabled = disabled || loading;

  return (
    <Pressable
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      disabled={isDisabled}
      onPress={onPress}
      style={[
        styles.button,
        variant === "soft" ? styles.softButton : styles.solidButton,
        isDisabled ? styles.disabledButton : null
      ]}
    >
      {loading ? (
        <ActivityIndicator color={variant === "soft" ? themeTokens.brandPrimary : "#ffffff"} />
      ) : (
        <>
          <Text style={[styles.label, variant === "soft" ? styles.softLabel : null]}>{label}</Text>
          {accessory}
        </>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    minHeight: 52,
    borderRadius: 16,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8
  },
  solidButton: {
    backgroundColor: themeTokens.brandPrimary,
    shadowColor: "#000000",
    shadowOpacity: 0.14,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 8
    },
    elevation: 3
  },
  softButton: {
    backgroundColor: themeTokens.brandPrimarySoft,
    borderWidth: 1,
    borderColor: themeTokens.border
  },
  disabledButton: {
    backgroundColor: "#89A59E",
    borderColor: "#89A59E",
    shadowOpacity: 0,
    elevation: 0
  },
  label: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700"
  },
  softLabel: {
    color: themeTokens.brandPrimary
  }
});